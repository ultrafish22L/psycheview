# 🔄 PSYCHEVIEW RECOVERY PROMPT

## 🎯 MISSION: Restore PsycheView Development Environment

You are an expert coding assistant working on **PsycheView**, a sophisticated interactive web application for viewing psychedelic imagery with AI-powered outfill capabilities. This prompt will restore you to the exact state we were in before system restart.

## 📍 CURRENT STATUS SUMMARY

**REPOSITORY STATE:**
- Repository: `ultrafish22L/psycheview` 
- Local branch: `main` (17 commits ahead of origin/main)
- Working directory: Clean, no uncommitted changes
- Latest commit: `23b9810` "Test push"
- Previous key commit: `7732c1d` "🌐 INFINITE GRID COMPLETE"

**DEPLOYMENT ISSUE:**
- ❌ **Git push failing**: All token formats return 403 "Permission denied to ultrafish22L"
- ✅ **API calls work**: GitHub API authentication successful with Bearer token
- 🔍 **Root cause**: Fine-grained personal access token missing "Contents: Write" permission
- 📦 **Workaround**: Created downloadable tar.gz package for user

**COMPLETED FEATURES:**
- ✅ **Infinite Grid System**: Perfect white grid overlay aligned with image boundaries
- ✅ **Direction-Based API System**: Vector-based calls with multi-block responses (2x2 → 3 blocks)
- ✅ **Canvas-Based Grid**: JavaScript canvas replacing CSS background for pixel-perfect control
- ✅ **Real-Time Updates**: Grid redraws on pan, zoom, window resize
- ✅ **Optimal Default View**: 0.5x zoom showing space around image
- ✅ **API Integration**: Working Stability AI outpaint calls
- ✅ **Dual-Mode Operation**: Demo (simulated) and Live (real AI) modes

## 🏗️ TECHNICAL ARCHITECTURE

**MAIN APPLICATION:**
- **File**: `index.html` (2,501 lines, single-file app)
- **Technology**: Pure HTML/CSS/JavaScript (zero dependencies)
- **Main Class**: `ImageViewer` with comprehensive viewer management
- **Grid System**: Canvas-based infinite grid (1600x1024px cells = exact image size)

**KEY METHODS IMPLEMENTED:**
```javascript
// Direction-based API system
getOutpaintDirections(blockKey) // Returns {directionX, directionY, gridX, gridY}
callStabilityAPI(blockKey) // Direction-based API calls with pixel values
processMultiBlockResponse(responseBlob, originalBlockKey, directionX, directionY)
extractAndPlaceBlocks(sourceCanvas, originalBlockKey, directionX, directionY)
extractAndUpdateBlock(sourceCanvas, blockKey, sourceX, sourceY, blockSizeX, blockSizeY)

// Grid system
drawGrid() // Canvas-based infinite white grid overlay
updateTransform() // Applies transforms and triggers block visibility checks
checkVisibleBlocks() // Calculates visible blocks and queues generation
```

**SERVER:**
- **File**: `server.js` (81 lines, minimal Node.js)
- **Purpose**: Static files, CORS, API key management
- **Port**: 52778 (configurable via PORT env var)
- **Endpoint**: `/api/config` for API key configuration

## 🎨 CURRENT FUNCTIONALITY

**INFINITE GRID SYSTEM:**
- **Grid Spacing**: Each cell = 1600x1024px (exact image dimensions)
- **Alignment**: Grid lines perfectly aligned with image boundaries at all zoom levels
- **Canvas Implementation**: JavaScript canvas for pixel-perfect rendering
- **Real-Time**: Automatically redraws on pan, zoom, resize
- **Coordinate System**: Original image at (0,0), adjacent blocks at (1,0), (0,1), etc.

**AI OUTFILL SYSTEM:**
- **Direction Vectors**: Uses (directionX, directionY) instead of string arrays
- **Multi-Block Efficiency**: Single 2x2 API call fills 3 blocks using "3-block trick"
- **API Parameters**: Sends left/right/up/down pixel values to Stability AI
- **Error Handling**: Graceful fallback with visual error indicators
- **Priority Queue**: Smart block prioritization based on visibility

**USER INTERFACE:**
- **Pan & Zoom**: Click-drag to pan, scroll wheel to zoom (0.25x - 4x)
- **Touch Support**: Full mobile and tablet compatibility
- **Psychedelic Design**: Animated backgrounds, glassmorphism effects
- **Responsive**: Adaptive layouts for all screen sizes

## 🚨 KNOWN ISSUES

**PRIMARY ISSUE - GIT PUSH AUTHENTICATION:**
```bash
# All these formats fail with 403:
git remote set-url origin https://${GITHUB_TOKEN}@github.com/ultrafish22L/psycheview.git
git remote set-url origin https://x-access-token:${GITHUB_TOKEN}@github.com/ultrafish22L/psycheview.git  
git remote set-url origin https://oauth2:${GITHUB_TOKEN}@github.com/ultrafish22L/psycheview.git
git remote set-url origin https://ultrafish22L:${GITHUB_TOKEN}@github.com/ultrafish22L/psycheview.git

# Error: "Permission to ultrafish22L/psycheview.git denied to ultrafish22L"
```

**DIAGNOSIS:**
- Token has API read permissions but lacks git push permissions
- Fine-grained personal access token missing "Contents: Write" scope
- User regenerated token multiple times, issue persists
- VPN restart attempted, no change in behavior

## 📦 RECOVERY ACTIONS NEEDED

**IMMEDIATE PRIORITIES:**

1. **RESTORE DEVELOPMENT ENVIRONMENT:**
   ```bash
   # Clone repository
   git clone https://github.com/ultrafish22L/psycheview.git
   cd psycheview
   
   # Install dependencies
   npm install
   
   # Start development server
   npm start
   # Should run on http://localhost:52778
   ```

2. **VERIFY INFINITE GRID SYSTEM:**
   - Open browser to http://localhost:52778
   - Confirm white grid overlay visible
   - Test pan/zoom - grid should stay aligned with image
   - Default zoom should be 0.5x (zoomed out showing space around image)
   - Grid cells should be exactly 1600x1024px (image size)

3. **TEST API INTEGRATION:**
   ```bash
   # Set API key for live mode
   export STABILITY_API_KEY="your-api-key-here"
   
   # Toggle to Live mode in UI
   # Pan to edge of image to trigger block generation
   ```

4. **ADDRESS GIT PUSH ISSUE:**
   - Check token permissions in GitHub settings
   - Ensure "Contents: Write" permission is enabled
   - Consider creating new classic token with full repo scope
   - Alternative: Use GitHub CLI or different authentication method

## 🔧 DEVELOPMENT CONTEXT

**RECENT MAJOR WORK:**
- **Grid System Overhaul**: Replaced CSS background with JavaScript canvas
- **Direction-Based API**: Implemented vector-based direction system
- **Multi-Block Processing**: Added 2x2 response handling with 3-block extraction
- **API Integration**: Extensive Stability AI integration work
- **Standalone Mode**: Ensured functionality without server

**CODE QUALITY:**
- Zero external dependencies (frontend)
- Single-file architecture (index.html contains everything)
- Modern web standards (CSS transforms, Canvas API)
- Comprehensive error handling
- Mobile-first responsive design

**TESTING COMPLETED:**
- ✅ Grid alignment at multiple zoom levels
- ✅ Pan/zoom responsiveness
- ✅ API calls with real Stability AI endpoint
- ✅ Demo mode block generation
- ✅ Touch/mobile compatibility
- ✅ Cross-browser functionality

## 🎯 SUCCESS CRITERIA

**ENVIRONMENT RESTORED WHEN:**
1. ✅ Development server running on localhost:52778
2. ✅ Infinite grid system visible and functional
3. ✅ Pan/zoom working with grid alignment
4. ✅ Default 0.5x zoom showing space around image
5. ✅ Demo mode generating psychedelic blocks
6. ✅ Live mode ready (with API key)

**GIT ISSUE RESOLVED WHEN:**
1. ✅ `git push origin main` succeeds without 403 error
2. ✅ 17 local commits successfully pushed to GitHub
3. ✅ Repository shows latest infinite grid implementation

## 📚 KEY FILES TO EXAMINE

**CRITICAL FILES:**
- `index.html` - Main application (2,501 lines)
- `server.js` - Node.js backend (81 lines)
- `package.json` - Dependencies and scripts
- `README.md` - User documentation
- `REPRODUCTION_PROMPT.md` - Complete reproduction guide

**ASSETS:**
- `psychedelic-flora.jpg` - Main artwork (1600x1024px)
- `psychedelic-bg.jpg` - Tiled background pattern

**TESTING:**
- `debug.html` - Debug toggle testing
- `test_outfill.html` - Outfill system testing

## 🚀 NEXT STEPS AFTER RECOVERY

1. **Verify infinite grid system working**
2. **Test API integration with live calls**
3. **Resolve git push authentication issue**
4. **Deploy latest changes to GitHub**
5. **Create production tag for infinite grid milestone**

## 💡 IMPORTANT NOTES

- **Single-file app**: Everything in index.html for portability
- **Block size = image size**: Each grid cell is exactly 1600x1024px
- **Direction vectors**: System uses (directionX, directionY) not string arrays
- **3-block trick**: Diagonal API calls generate 3 blocks from 2x2 response
- **Canvas grid**: JavaScript canvas replaced CSS background for precision
- **Zero dependencies**: Works in any modern browser without external libraries

This prompt should restore you to exactly where we were: a fully functional infinite grid system with API integration, blocked only by git push authentication issues that need token permission fixes.

---

**🎨 PSYCHEVIEW - INFINITE PSYCHEDELIC IMAGE EXPLORATION**
*Where AI meets trippy visuals in perfect grid harmony*