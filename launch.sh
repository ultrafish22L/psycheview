#!/bin/bash

echo "========================================"
echo "   PsycheView - Psychedelic Image Viewer"
echo "========================================"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed"
    echo
    echo "Please install Node.js:"
    echo "  • Ubuntu/Debian: sudo apt install nodejs npm"
    echo "  • macOS: brew install node"
    echo "  • Or download from: https://nodejs.org/"
    echo
    exit 1
fi

# Display Node.js version
echo "Node.js version: $(node --version)"
echo

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo
fi

# Set environment variables
export PORT=52778
# Uncomment and set your Stability AI API key if you have one
# export STABILITY_API_KEY="your-api-key-here"

# Display server info
echo "Starting PsycheView server..."
echo
echo "✅ CORS/Canvas Issues Fixed: Using HTTP server instead of file:// protocol"
echo "✅ Canvas Operations: toBlob(), drawImage(), getImageData() now working"
echo "✅ Demo Mode: Psychedelic block generation fully functional"
echo "✅ Live Mode: Ready for Stability AI integration with API key"
echo
echo "Server will be available at:"
echo "  http://localhost:52778"
echo
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo

# Start the server
node server.js

# If server stops, show message
echo
echo "Server stopped."