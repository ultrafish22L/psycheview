import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: grab;
  touch-action: none;
  
  &:active {
    cursor: grabbing;
  }
`;

const MovableArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  transform-origin: center;
  transform: translate(-50%, -50%);
  user-select: none;
  will-change: transform;
`;

const MovingBackground = styled.div`
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: 
    repeating-linear-gradient(
      45deg,
      rgba(255, 0, 255, 0.2),
      rgba(0, 255, 255, 0.2) 50px,
      rgba(255, 255, 0, 0.2) 100px,
      rgba(255, 0, 128, 0.2) 150px
    );
  animation: slide 20s linear infinite;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-radial-gradient(
        circle at 50% 50%,
        rgba(255, 0, 255, 0.1) 0,
        rgba(0, 255, 255, 0.1) 40px,
        rgba(255, 255, 0, 0.1) 80px,
        rgba(255, 0, 128, 0.1) 120px
      );
    mix-blend-mode: screen;
    animation: pulse 8s ease-in-out infinite;
    will-change: transform;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-conic-gradient(
        from 0deg at 50% 50%,
        rgba(255, 0, 255, 0.1) 0deg,
        rgba(0, 255, 255, 0.1) 90deg,
        rgba(255, 255, 0, 0.1) 180deg,
        rgba(255, 0, 128, 0.1) 270deg,
        rgba(255, 0, 255, 0.1) 360deg
      );
    mix-blend-mode: overlay;
    animation: rotate 15s linear infinite;
    will-change: transform;
  }

  @keyframes slide {
    0% { transform: translate(0, 0); }
    100% { transform: translate(200px, 200px); }
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(1); opacity: 0.5; }
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Grid = styled.div`
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background-image: 
    linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px);
  background-size: 100px 100px;
  pointer-events: none;
  will-change: transform;
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vmin;
  height: 60vmin;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
`;

export function DraggableImage({ imageSrc }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only handle left mouse button
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;
    
    const handleMouseMove = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      setPosition({ x: newX, y: newY });
    };
    
    const handleMouseUp = (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp, { passive: false });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // More responsive zoom speed
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.1, scale * (1 + delta)), 10);
    
    // Get container dimensions
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Calculate mouse position relative to container center
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    // Calculate new position to zoom towards mouse
    const factor = 1 - newScale / scale;
    const newX = position.x + mouseX * factor;
    const newY = position.y + mouseY * factor;
    
    setScale(newScale);
    setPosition({ x: newX, y: newY });
  };

  return (
    <Container 
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      <MovableArea
        style={{
          transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`
        }}
      >
        <MovingBackground />
        <Grid />
        <Image 
          src={imageSrc}
          alt="Draggable Image"
          draggable="false"
        />
      </MovableArea>
    </Container>
  );
}