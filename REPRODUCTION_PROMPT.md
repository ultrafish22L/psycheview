# PsycheView: AI-Powered Infinite Image Outpainting System

## Section 1: Project Overview & User Experience

**PsycheView** is a sophisticated web-based image viewer that enables users to infinitely extend any image in all directions using AI-powered outpainting. The application transforms a single image into an endless explorable canvas through intelligent API integration with Stability AI's outpaint service.

### Core User Experience

**Initial View**: Users see a psychedelic floral image (1600x1024px) displayed at 50% zoom (0.5x scale) in the center of a dark, animated background. This zoomed-out view provides ample space around the image, immediately suggesting the possibility of extension.

**Visual Grid System**: A bright white grid overlay with 2px thick lines provides perfect visual guidance. Each grid cell is exactly the size of the original image (1600x1024px), with the original image positioned at grid coordinates (0,0). The grid extends infinitely in all directions, creating a clear framework for understanding where new content can be generated.

**Interactive Navigation**: Users can pan by clicking and dragging anywhere on the canvas, and zoom using scroll wheel or touch gestures (0.25x to 4x range). The grid dynamically updates in real-time, maintaining perfect alignment with the image boundaries at all zoom levels and pan positions.

**Automatic Content Generation**: As users explore the canvas by panning around, the system intelligently detects when they're viewing empty grid cells adjacent to existing content. It automatically triggers AI generation calls to fill these spaces, creating seamless extensions of the original artwork. Users see real-time progress indicators and can monitor API calls through a comprehensive debug console.

**Seamless Integration**: New content appears as users explore, creating the illusion of an infinite canvas that was always there. Each generated block maintains visual consistency with the original image through carefully crafted prompts that emphasize continuity of style, color, and artistic elements.

**Debug & Control Interface**: A sophisticated control panel provides API key management, generation toggles, block size options, and real-time monitoring of the generation queue. Users can see exactly what's happening behind the scenes while maintaining a clean, uncluttered viewing experience.

### User Journey
1. **Discovery**: User opens the application and sees the original image with clear grid boundaries
2. **Exploration**: User pans around to explore the space, immediately understanding the grid system
3. **Generation**: System automatically generates adjacent content as user moves to new areas
4. **Infinite Experience**: User can continue exploring indefinitely as new content generates seamlessly

## Section 2: Technical Architecture & Engineering Design

### Core Architecture Pattern
Implement a **single-page application** using vanilla JavaScript with a main `ImageViewer` class that manages all functionality. Use **no external dependencies** or build tools - everything should work directly in the browser from a single HTML file with embedded CSS and JavaScript.

### Grid System Implementation
Create a **dual-layer rendering system**:
- **Background Layer**: Animated psychedelic tiled background for visual appeal
- **Grid Layer**: HTML5 Canvas overlay that draws infinite white grid lines
- **Content Layer**: Standard DOM img elements for the original image and generated blocks

The grid system must use **canvas-based rendering** with JavaScript, not CSS backgrounds. Calculate grid line positions based on image dimensions and current viewport transform (scale, translateX, translateY). Redraw the grid on every transform change, window resize, and initialization.

### Coordinate System Design
Implement a **block-based coordinate system** where:
- Each block is exactly the original image size (1600x1024px)
- Original image is positioned at coordinates (0,0)
- Adjacent blocks use integer coordinates: (1,0) for right, (0,1) for down, (-1,0) for left, etc.
- Use string keys like "1,0" for block identification and storage
- Convert between screen coordinates and block coordinates using transform math

### API Integration Architecture
Design a **direction-based API system** that:
- Detects which blocks are visible but empty in the current viewport
- Calculates direction vectors (directionX, directionY) for each needed block
- Maps direction vectors to Stability AI API parameters (left, right, up, down pixel values)
- Handles API responses by positioning generated images at correct block coordinates
- Implements intelligent queueing to avoid duplicate requests and manage rate limits

### State Management Strategy
Maintain application state through:
- **Transform State**: scale, translateX, translateY for viewport positioning
- **Block Registry**: Map of block coordinates to image data and status
- **Generation Queue**: Priority queue of pending API requests
- **API Configuration**: Centralized settings for prompts, creativity, output format

### Performance Optimization Approach
- **Lazy Loading**: Only generate blocks when they become visible
- **Viewport Culling**: Only draw grid lines within screen bounds plus small buffer
- **Memory Management**: Clean up blob URLs and canvas contexts appropriately
- **Request Deduplication**: Prevent multiple API calls for the same block
- **Priority Queuing**: Generate blocks closest to viewport first

### Event Handling Design
Implement **unified event system** for:
- Mouse/touch input for pan and zoom with proper coordinate transformation
- Keyboard shortcuts for common actions
- Window resize handling with grid redraw
- API response handling with automatic block placement
- Error handling with user feedback and retry mechanisms

### API Integration Specifications
Interface with **Stability AI v2beta outpaint API** using:
- FormData requests with image blob, prompt, and direction parameters
- Bearer token authentication with environment variable injection
- Response handling for JPEG/PNG blob data
- Error handling for rate limits, invalid requests, and network issues
- Request logging and debugging with comprehensive console output

### Responsive Design Requirements
Ensure the application works across:
- **Desktop browsers** with mouse and keyboard input
- **Touch devices** with gesture support for pan/zoom
- **Various screen sizes** with adaptive UI scaling
- **Different pixel densities** with proper canvas resolution

### Development & Deployment Strategy
Structure as a **dual-mode application**:
- **Standalone Mode**: Works via file:// protocol for local development
- **Server Mode**: Node.js server for API key management and CORS handling
- **No Build Process**: Direct browser execution with no compilation step
- **Environment Flexibility**: Automatic detection of available features

## Future Development Opportunities

### Enhanced AI Integration
- **Multiple AI Models**: Support for different outpainting services (DALL-E, Midjourney, etc.)
- **Style Transfer**: Allow users to change artistic styles while maintaining content
- **Prompt Customization**: User-defined prompts for different generation styles
- **Quality Settings**: Variable resolution and quality options

### Advanced Grid Features
- **Variable Block Sizes**: Support for different block dimensions and aspect ratios
- **Smart Boundaries**: Automatic detection of natural image boundaries for better seaming
- **Grid Snapping**: Magnetic alignment for precise positioning
- **Custom Grid Patterns**: Non-rectangular grid systems for artistic effects

### User Experience Enhancements
- **Save/Load Sessions**: Persistent storage of generated canvases
- **Export Functionality**: High-resolution export of entire generated areas
- **Collaboration Features**: Shared canvases with multiple users
- **Animation Support**: Smooth transitions between generated blocks

### Performance & Scalability
- **WebGL Acceleration**: GPU-accelerated rendering for large canvases
- **Progressive Loading**: Streaming of high-resolution content
- **Caching System**: Local storage of generated blocks
- **Background Generation**: Pre-generate likely exploration areas

This architecture provides a solid foundation for infinite image exploration while maintaining simplicity, performance, and extensibility.