import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TileContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Grid = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400%;
  height: 400%;
  transform: translate(-50%, -50%);
  background-image: 
    linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.1) 10px, transparent 10px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 10px, transparent 10px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  pointer-events: none;
  animation: gridPulse 10s ease-in-out infinite;

  @keyframes gridPulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
`;

const TILE_SIZE = 1024;
const BUFFER_TILES = 1; // Number of tiles to load beyond visible area

export function InfiniteCanvas({ 
  initialImage,
  scale = 1,
  position = { x: 0, y: 0 },
  onPositionChange,
  onScaleChange 
}) {
  const containerRef = useRef(null);
  // Handle pan/zoom changes
  useEffect(() => {
    // Could add additional effects here if needed
  }, [scale, position.x, position.y]);

  // Handle mouse/touch events for panning
  const handleMouseDown = (e) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Handle wheel events for zooming
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(10, scale * delta));
    onScaleChange(newScale);
  };

  return (
    <Canvas
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      <TileContainer
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
        }}
      >
        <Grid />
        <ImageContainer>
          <MainImage 
            src={initialImage}
            alt="Main Image"
            style={{
              maxWidth: '80vmin',
              maxHeight: '60vmin'
            }}
          />
        </ImageContainer>
      </TileContainer>
    </Canvas>
  );
}