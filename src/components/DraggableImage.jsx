import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  
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
  transform-origin: 50% 50%;
  user-select: none;
  will-change: transform;
  pointer-events: all;
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
  const [isDragging, setIsDragging] = useState(false);
  
  const moveBy = useCallback((dx, dy) => {
    setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);
  
  const zoomBy = useCallback((delta, centerX, centerY) => {
    const newScale = Math.min(Math.max(0.1, scale * Math.exp(delta)), 5);
    const factor = newScale / scale;
    
    setScale(newScale);
    setPosition(prev => ({
      x: prev.x + (centerX - centerX * factor),
      y: prev.y + (centerY - centerY * factor)
    }));
  }, [scale]);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      const moveStep = e.shiftKey ? 100 : 50;
      const zoomStep = e.shiftKey ? 0.2 : 0.1;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveBy(moveStep, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveBy(-moveStep, 0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveBy(0, moveStep);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveBy(0, -moveStep);
          break;
        case '=':
        case '+':
          e.preventDefault();
          zoomBy(zoomStep, window.innerWidth / 2, window.innerHeight / 2);
          break;
        case '-':
        case '_':
          e.preventDefault();
          zoomBy(-zoomStep, window.innerWidth / 2, window.innerHeight / 2);
          break;
        case '0':
          e.preventDefault();
          setScale(1);
          setPosition({ x: 0, y: 0 });
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveBy, zoomBy]);
  
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only handle left mouse button
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;
    setIsDragging(true);
    
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      e.stopPropagation();
      
      requestAnimationFrame(() => {
        setPosition({
          x: e.clientX - startX,
          y: e.clientY - startY
        });
      });
    };
    
    const handleMouseUp = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      window.removeEventListener('mousemove', handleMouseMove, { capture: true });
      window.removeEventListener('mouseup', handleMouseUp, { capture: true });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { capture: true });
    window.addEventListener('mouseup', handleMouseUp, { capture: true });
  };
  
  // Touch support
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const startX = touch.clientX - position.x;
    const startY = touch.clientY - position.y;
    setIsDragging(true);
    
    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      requestAnimationFrame(() => {
        setPosition({
          x: touch.clientX - startX,
          y: touch.clientY - startY
        });
      });
    };
    
    const handleTouchEnd = (e) => {
      e.preventDefault();
      setIsDragging(false);
      
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('touchend', handleTouchEnd, { capture: true });
    };
    
    window.addEventListener('touchmove', handleTouchMove, { capture: true, passive: false });
    window.addEventListener('touchend', handleTouchEnd, { capture: true });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Calculate zoom
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.1, scale * Math.exp(delta)), 5);
    
    // Get mouse position relative to container
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate zoom center point
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate offset from center
    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;
    
    // Calculate new position to maintain mouse point during zoom
    const factor = newScale / scale;
    const newX = position.x + (distanceX - distanceX * factor);
    const newY = position.y + (distanceY - distanceY * factor);
    
    requestAnimationFrame(() => {
      setScale(newScale);
      setPosition({ x: newX, y: newY });
    });
  };

  return (
    <Container 
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <MovableArea
        style={{
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
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