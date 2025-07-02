# PsycheView - Complete Reproduction Prompt

Create a super slick, modern, interactive web viewer for a psychedelic floral image with the following **EXACT** specifications:

## 🎨 VISUAL DESIGN & UX

### Background Animation
- **Psychedelic animating background** that fills the entire page
- **Gradient animation** with purple, blue, green, and teal colors
- **Smooth color transitions** with saturation, contrast, brightness, and hue-rotate effects
- **75-second animation cycle** with ease-in-out timing
- **Opacity variations** between 0.4-0.7 for trippy effect

### Image Window
- **Centered window** sized to fit the image with glassmorphism styling
- **Content clipped** by window edges with `overflow: hidden`
- **Pan with click and drag** - smooth, fluid mouse interactions
- **Zoom with mouse wheel** - stops at 4x zoom in both directions (0.25x to 4x)
- **Zoom maintains cursor position** - image stays under cursor while zooming
- **Touch support** for mobile devices

### Image Window Contents (3 Stacked Layers)
1. **Tiled Background Layer**: Trippy static image that tiles infinitely (clipped by window)
2. **Grid Overlay Layer**: Grey line grid extending infinitely (clipped by window)
   - **Dynamic grid sizing**: Horizontal lines spaced at 1/4 image height
   - **Dynamic grid sizing**: Vertical lines spaced at 1/4 image width
   - **Perfect alignment** with image boundaries using `updateGridSize()` function
3. **Main Image Layer**: The psychedelic floral image on top

### UI Elements
- **Glassmorphism effects** throughout with backdrop-blur and semi-transparent backgrounds
- **Drop shadows** and modern styling
- **Zoom indicator** showing current zoom level (e.g., "1.00x")
- **Queue status indicator** showing "Queue: X | Active: Y"
- **Demo/Live mode toggle switch** with smooth animations
- **Progress indicators** for block generation (circular progress with percentages)

## 🔧 TECHNICAL IMPLEMENTATION

### Core Architecture
- **Pure HTML/CSS/JavaScript** - No frameworks or dependencies
- **Modular JavaScript class** (`PsycheViewer`) with clean event handling
- **Canvas API integration** for precise mask generation
- **Blob handling** for efficient image data management
- **Node.js server** for environment variable handling and CORS

### Pan & Zoom System
```javascript
// Implement smooth pan with translateX/translateY
// Implement zoom with scale transform
// Maintain cursor position during zoom with proper coordinate calculations
// Use requestAnimationFrame for smooth animations
```

### Outfill Generation System
**CRITICAL**: Implement **dual-mode system** with toggle switch:

#### Demo Mode (Default)
- **Simulated block generation** with trippy gradient patterns
- **Progress animation** from 0% to 100% over 2-3 seconds
- **No API calls** - purely visual simulation
- **Instant fallback** when API fails

#### Live Mode (Stability AI Integration)
- **Real Stability AI v2beta outpaint API calls**
- **Environment variable**: `STABILITY_API_KEY` (with fallback prompt)
- **API Endpoint**: `https://api.stability.ai/v2beta/stable-image/edit/outpaint`
- **Parameters**:
  - `image`: Original image as blob
  - `mask`: Canvas-generated precise mask for block area
  - `prompt`: "psychedelic floral pattern, vibrant colors, organic shapes, detailed botanical elements"
  - `creativity`: 0.35 (balanced coherence/creativity)
  - `output_format`: "jpeg"

### Block Management System
- **Priority-based queue** with `calculateBlockPriority()` function
- **Visibility percentage** + **distance from center** + **bonuses**
- **Dynamic queue sorting** on every pan/zoom operation
- **Real-time queue updates** with `updateQueueIndicator()`
- **Error handling** with red error indicators (❌) for failed generations

### Grid Alignment System (**CRITICAL FIX**)
```javascript
updateGridSize() {
    if (!this.imageWidth || !this.imageHeight) return;
    
    // Calculate grid cell size (quarter of image dimensions)
    const gridCellWidth = this.imageWidth / 4;
    const gridCellHeight = this.imageHeight / 4;
    
    // Update the grid overlay background-size
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay) {
        gridOverlay.style.backgroundSize = `${gridCellWidth}px ${gridCellHeight}px`;
    }
}
```

## 📁 FILE STRUCTURE

### index.html
- **Complete single-file application**
- **Embedded CSS** with animations and glassmorphism
- **Embedded JavaScript** with PsycheViewer class
- **Mode toggle switch** with onclick handler (NOT addEventListener)
- **Grid overlay** with dynamic background-size
- **Progress indicators** and queue status display

### server.js
```javascript
// Node.js server with Express
// CORS enabled for all origins
// /api/config endpoint for API key management
// Environment variable handling for STABILITY_API_KEY
// Port 52778 configuration
```

### package.json
```json
{
  "name": "psycheview",
  "version": "1.0.0",
  "description": "Interactive psychedelic image viewer with AI outfill",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
```

### psychedelic-flora.jpg
- **Main image file** - psychedelic floral artwork with vibrant colors
- **Serpentine creatures** and **botanical elements**
- **Rich color palette** with greens, purples, oranges, blues

## 🎯 KEY IMPLEMENTATION DETAILS

### Mode Toggle System
```javascript
// Use onclick assignment, NOT addEventListener (critical for reliability)
this.modeToggle.onclick = () => {
    this.toggleMode();
};

// Async API key handling with environment variable fallback
async checkApiKey() {
    try {
        const response = await fetch('/api/config');
        const config = await response.json();
        return config.apiKey || prompt('Enter your Stability AI API key:');
    } catch (error) {
        return prompt('Enter your Stability AI API key:');
    }
}
```

### Block Generation Logic
```javascript
// Split generation: demo vs API
async simulateGeneration(blockKey) {
    if (this.isLiveMode) {
        return this.generateWithAPI(blockKey);
    } else {
        return this.generateDemo(blockKey);
    }
}

// Canvas mask generation for API calls
generateMaskForBlock(blockKey) {
    // Create precise canvas-based mask for the block area
    // Return as blob for API submission
}
```

### Stability AI Integration
```javascript
async callStabilityAPI(imageBlob, maskBlob, prompt) {
    const formData = new FormData();
    formData.append('image', imageBlob);
    formData.append('mask', maskBlob);
    formData.append('prompt', prompt);
    formData.append('creativity', '0.35');
    formData.append('output_format', 'jpeg');

    const response = await fetch('https://api.stability.ai/v2beta/stable-image/edit/outpaint', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData
    });
    
    return response.blob();
}
```

## 🚀 STARTUP SEQUENCE

1. **Create Node.js server** with package.json and dependencies
2. **Implement index.html** with complete PsycheViewer class
3. **Add psychedelic-flora.jpg** image file
4. **Test demo mode** functionality (default mode)
5. **Verify grid alignment** with updateGridSize() function
6. **Test live mode** with API key (optional)
7. **Verify responsive design** and touch support

## ✅ VERIFICATION CHECKLIST

- [ ] Background animation working (purple/green/blue gradients)
- [ ] Pan and zoom functionality smooth and responsive
- [ ] Grid overlay perfectly aligned with image boundaries
- [ ] Demo mode generates simulated blocks with progress
- [ ] Live mode toggle switches correctly
- [ ] Queue system shows real-time updates
- [ ] Mobile touch support working
- [ ] Glassmorphism effects applied throughout
- [ ] Error handling graceful with fallback backgrounds

## 🏷️ VERSION TAGS

- **`zelator`** - Sophisticated priority-based queue management system
- **`zelator2`** - ✅ **FIXED** Perfect block alignment with dynamic grid sizing  
- **`magister`** - 🎯 **PRODUCTION-READY** Complete demo/live mode system with Stability AI integration

## 🎨 EXACT STYLING REQUIREMENTS

### Colors
- **Background**: Animated gradients (purple #8B5CF6, blue #3B82F6, green #10B981, teal #14B8A6)
- **Grid lines**: rgba(128, 128, 128, 0.15) with soft-light blend mode
- **UI elements**: Semi-transparent with backdrop-blur
- **Progress indicators**: Circular with percentage display

### Animations
- **Background**: 75s ease-in-out infinite with hue-rotate and filter effects
- **Grid**: 75s subtle shift with opacity and hue variations
- **Transitions**: Smooth 0.3s ease for all interactive elements
- **Progress**: Real-time updates with smooth circular animation

### Typography
- **Modern sans-serif** fonts
- **Glassmorphism text styling** with proper contrast
- **Responsive sizing** for different screen sizes

This prompt will reproduce the **EXACT** PsycheView implementation with all features, styling, and functionality as currently implemented.