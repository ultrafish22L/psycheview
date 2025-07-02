# PsycheView 🎨

A super slick, modern, interactive web viewer for psychedelic imagery with AI-powered outfill capabilities, featuring both demo and live generation modes.

## ✨ Features

### 🖼️ Interactive Image Viewer
- **Pan & Zoom**: Click and drag to pan, scroll to zoom (0.25x - 4x)
- **AI Outfill System**: Intelligent block-based image extension with priority queue
- **Demo/Live Modes**: Switch between simulated and real AI generation
- **Touch Support**: Full mobile and tablet compatibility
- **Smooth Animations**: Fluid transitions for all interactions
- **Cursor-Centered Zoom**: Image maintains position under cursor while zooming

### 🤖 AI Outfill Modes
- **Demo Mode**: Simulated generation with progress animations (no API key required)
- **Live Mode**: Real AI outfill using Stability AI's outpaint API
- **Priority Queue**: Smart block prioritization based on visibility and proximity
- **Real-time Status**: Live queue indicators and generation progress

### 🎭 Visual Design
- **Clean Interface**: No visual artifacts or edge effects for perfect seamless viewing
- **Psychedelic Background**: Animated floating orbs and gradient fields
- **Grid Overlay**: Dynamic grid spacing based on image dimensions (1/4 width/height)
- **Tiled Background**: Infinitely repeating psychedelic pattern
- **Modern Aesthetics**: Sleek, contemporary design

### 📱 Responsive Design
- **Mobile Optimized**: Touch-friendly interactions
- **Adaptive Layout**: Responsive sizing with viewport units
- **Cross-Browser**: Compatible with modern browsers
- **Zero Dependencies**: Pure HTML, CSS, and JavaScript

### 🎨 Three-Layer System
1. **Tiled Background**: Psychedelic pattern that extends infinitely
2. **Grid Overlay**: Semi-transparent grid aligned to image dimensions
3. **Main Image**: The featured psychedelic floral artwork

All layers move together seamlessly during pan and zoom operations.

## 🚀 Getting Started

### Demo Mode (Quick Start)
```bash
# Clone the repository
git clone https://github.com/ultrafish22L/psycheview.git
cd psycheview

# Start the server
npm start
# or
node server.js

# Visit http://localhost:52778
```

### Live Mode Setup
1. Get a Stability AI API key from https://platform.stability.ai/
2. Set the environment variable:
```bash
export STABILITY_API_KEY="your-api-key-here"
node server.js
```
3. Toggle to Live mode using the switch in the top-left corner

### Environment Variables
- `STABILITY_API_KEY`: Your Stability AI API key for live outfill generation
- `PORT`: Server port (default: 52778)

## 🎮 Controls

- **Mouse**: Click and drag to pan, scroll wheel to zoom
- **Touch**: Single finger drag to pan, pinch to zoom
- **Mode Toggle**: Click the switch in top-left to toggle Demo/Live modes
- **Zoom Range**: 0.25x (25%) to 4x (400%)
- **Queue Status**: Top-right shows current queue and active generations
- **Smooth Animations**: All movements are fluid and responsive

## 🧠 How the AI System Works

### Outfill Algorithm
1. **Block Detection**: Image divided into 4x4 grid of blocks
2. **Visibility Tracking**: System tracks which blocks are visible in viewport
3. **Priority Queue**: Blocks prioritized by:
   - Visibility percentage (0-100 points)
   - Distance from viewport center (0-20 points)
   - Fully visible bonus (+50 points)
4. **Generation**: Up to 2 blocks generate simultaneously
5. **Dynamic Resorting**: Queue resorts on every pan/zoom for optimal experience

### API Integration (Live Mode)
- **Endpoint**: Stability AI v2beta outpaint API
- **Mask Generation**: Creates precise masks for each block area
- **Prompt**: "psychedelic floral pattern, vibrant colors, organic shapes, detailed botanical elements"
- **Creativity**: 0.35 (balanced between coherence and creativity)
- **Error Handling**: Failed generations show red error indicators

## 🛠️ Tech Stack

- **Frontend**: Pure HTML/CSS/JavaScript - No frameworks or dependencies
- **Backend**: Node.js server for environment variable handling
- **AI Integration**: Stability AI v2beta outpaint API
- **Modern CSS**: Animations, transforms, and responsive design
- **Canvas API**: For precise mask generation
- **Blob Handling**: Efficient image data management

## 🎨 Design Philosophy

PsycheView focuses on creating a seamless, immersive viewing experience for psychedelic art. The clean interface eliminates visual distractions while the animated background and infinite outfill functionality create a trippy, engaging environment.

## 🏷️ Version Tags

- **`zelator`** - Sophisticated priority-based queue management system
- **`zelator2`** - ✅ **FIXED** Perfect block alignment with dynamic grid sizing
- **`magister`** - 🎯 **PRODUCTION-READY** Complete demo/live mode system with Stability AI integration

---

*Experience the intersection of modern web design and psychedelic art* ✨
