// SIMPLE BLOCK SYSTEM - Rewritten from scratch
// Each block = exactly the displayed image size, properly aligned

drawGrid() {
    const canvas = document.getElementById('gridCanvas');
    if (!canvas) return;
    
    // Set canvas size to match container
    const container = document.getElementById('viewerContent');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // SIMPLE BLOCK SYSTEM: Each block = exactly the displayed image size
    
    // The image is displayed with object-fit: contain, so calculate actual size
    const imageAspectRatio = this.imageWidth / this.imageHeight;
    const containerAspectRatio = this.containerWidth / this.containerHeight;
    
    let actualImageWidth, actualImageHeight;
    if (containerAspectRatio > imageAspectRatio) {
        // Container wider - image height = container height
        actualImageHeight = this.containerHeight;
        actualImageWidth = actualImageHeight * imageAspectRatio;
    } else {
        // Container taller - image width = container width  
        actualImageWidth = this.containerWidth;
        actualImageHeight = actualImageWidth / imageAspectRatio;
    }
    
    // Block size = actual displayed image size
    const blockWidth = actualImageWidth;
    const blockHeight = actualImageHeight;
    
    // Calculate where the image is positioned (centered in container)
    const imageLeft = (this.containerWidth - actualImageWidth) / 2;
    const imageTop = (this.containerHeight - actualImageHeight) / 2;
    
    // Transform to screen coordinates
    const screenImageLeft = (canvas.width - this.containerWidth * this.scale) / 2 + this.translateX + imageLeft * this.scale;
    const screenImageTop = (canvas.height - this.containerHeight * this.scale) / 2 + this.translateY + imageTop * this.scale;
    
    // Grid spacing in screen coordinates
    const screenBlockWidth = blockWidth * this.scale;
    const screenBlockHeight = blockHeight * this.scale;
    
    // Set grid line style
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    
    // Draw vertical grid lines (every block width)
    const startX = Math.floor((0 - screenImageLeft) / screenBlockWidth) - 2;
    const endX = Math.ceil((canvas.width - screenImageLeft) / screenBlockWidth) + 2;
    
    for (let i = startX; i <= endX; i++) {
        const x = screenImageLeft + i * screenBlockWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Draw horizontal grid lines (every block height)
    const startY = Math.floor((0 - screenImageTop) / screenBlockHeight) - 2;
    const endY = Math.ceil((canvas.height - screenImageTop) / screenBlockHeight) + 2;
    
    for (let i = startY; i <= endY; i++) {
        const y = screenImageTop + i * screenBlockHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    console.log('🔧 Simple grid: blockSize=' + Math.round(blockWidth) + 'x' + Math.round(blockHeight) + ', imagePos=' + Math.round(imageLeft) + ',' + Math.round(imageTop));
}

getVisibleBlocks() {
    if (!this.containerWidth || !this.containerHeight || !this.imageWidth || !this.imageHeight) {
        return new Set();
    }
    
    const visibleBlocks = new Set();
    
    // SIMPLE BLOCK SYSTEM: Each block = displayed image size
    const imageAspectRatio = this.imageWidth / this.imageHeight;
    const containerAspectRatio = this.containerWidth / this.containerHeight;
    
    let actualImageWidth, actualImageHeight;
    if (containerAspectRatio > imageAspectRatio) {
        actualImageHeight = this.containerHeight;
        actualImageWidth = actualImageHeight * imageAspectRatio;
    } else {
        actualImageWidth = this.containerWidth;
        actualImageHeight = actualImageWidth / imageAspectRatio;
    }
    
    // Block size = actual displayed image size
    const blockWidth = actualImageWidth;
    const blockHeight = actualImageHeight;
    
    // Calculate where the image is positioned (centered in container)
    const imageLeft = (this.containerWidth - actualImageWidth) / 2;
    const imageTop = (this.containerHeight - actualImageHeight) / 2;
    
    // Calculate viewport bounds in world coordinates
    // Original image is at (0,0) in block coordinates
    const viewportLeft = (-this.translateX - imageLeft * this.scale) / this.scale;
    const viewportTop = (-this.translateY - imageTop * this.scale) / this.scale;
    const viewportRight = viewportLeft + this.containerWidth / this.scale;
    const viewportBottom = viewportTop + this.containerHeight / this.scale;
    
    // Calculate which blocks are visible
    const startBlockX = Math.floor(viewportLeft / blockWidth);
    const endBlockX = Math.ceil(viewportRight / blockWidth);
    const startBlockY = Math.floor(viewportTop / blockHeight);
    const endBlockY = Math.ceil(viewportBottom / blockHeight);
    
    // Add all visible blocks except the original (0,0)
    for (let blockX = startBlockX; blockX < endBlockX; blockX++) {
        for (let blockY = startBlockY; blockY < endBlockY; blockY++) {
            // Skip the original image at block (0,0)
            if (blockX === 0 && blockY === 0) {
                continue;
            }
            
            visibleBlocks.add(`${blockX},${blockY}`);
        }
    }
    
    console.log('🔧 Simple blocks: blockSize=' + Math.round(blockWidth) + 'x' + Math.round(blockHeight) + ', visible=' + visibleBlocks.size);
    
    return visibleBlocks;
}