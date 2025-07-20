const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 53659;
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Disable caching for development
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // API endpoint to get the API key
    if (pathname === '/api/config' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            hasApiKey: !!STABILITY_API_KEY,
            apiKey: STABILITY_API_KEY || null
        }));
        return;
    }

    // Proxy endpoint for Stability AI API
    if (pathname === '/api/outpaint' && req.method === 'POST') {
        if (!STABILITY_API_KEY) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'STABILITY_API_KEY not configured' }));
            return;
        }

        // Collect request body
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            const requestBody = Buffer.concat(body);
            
            // Forward request to Stability AI
            const https = require('https');
            const options = {
                hostname: 'api.stability.ai',
                port: 443,
                path: '/v2beta/stable-image/edit/outpaint',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${STABILITY_API_KEY}`,
                    'Content-Type': req.headers['content-type'],
                    'Content-Length': requestBody.length
                }
            };

            const proxyReq = https.request(options, (proxyRes) => {
                // Forward response headers
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                
                // Forward response body
                proxyRes.pipe(res);
            });

            proxyReq.on('error', (err) => {
                console.error('Proxy request error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Proxy request failed' }));
            });

            // Send the request body
            proxyReq.write(requestBody);
            proxyReq.end();
        });

        return;
    }

    // Serve static files
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    
    // Security check
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
            return;
        }

        const ext = path.extname(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`STABILITY_API_KEY: ${STABILITY_API_KEY ? 'Set' : 'Not set'}`);
});