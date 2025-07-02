import { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const ViewerContainer = styled.div`
  position: relative;
  width: 80vmin;
  height: 60vmin;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  cursor: grab;
  user-select: none;
  
  &:active {
    cursor: grabbing;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      rgba(255, 0, 255, 0.3), 
      rgba(0, 255, 255, 0.3), 
      rgba(255, 255, 0, 0.3),
      rgba(255, 0, 255, 0.3)
    );
    border-radius: 22px;
    z-index: -1;
    animation: borderGlow 3s ease-in-out infinite alternate;
  }
  
  @keyframes borderGlow {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  will-change: transform;
  transition: ${props => props.$isDragging ? 'none' : 'transform 0.1s ease-out'};
`;

const TiledBackground = styled.div`
  position: absolute;
  width: 400%;
  height: 400%;
  top: -150%;
  left: -150%;
  background-image: url('/psychedelic-bg.jpg');
  background-size: 200px 200px;
  background-repeat: repeat;
  opacity: 0.6;
  mix-blend-mode: multiply;
  animation: backgroundFloat 30s linear infinite;
  
  @keyframes backgroundFloat {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-200px, -200px); }
  }
`;

const GridOverlay = styled.div`
  position: absolute;
  width: 400%;
  height: 400%;
  top: -150%;
  left: -150%;
  background-image: 
    linear-gradient(rgba(128, 128, 128, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(128, 128, 128, 0.3) 1px, transparent 1px);
  background-size: ${props => props.$gridSizeX}px ${props => props.$gridSizeY}px;
  pointer-events: none;
`;

const MainImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: none;
  max-height: none;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
`;

export function ImageViewer({ imageSrc }) {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, transformX: 0, transformY: 0 });

  // Load image and get dimensions for grid calculation
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Calculate grid spacing based on image size
  const gridSizeX = imageSize.width > 0 ? imageSize.width / 4 : 100;
  const gridSizeY = imageSize.height > 0 ? imageSize.height / 4 : 100;

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // Only left mouse button
    e.preventDefault();
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      transformX: transform.x,
      transformY: transform.y
    };

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      
      setTransform(prev => ({
        ...prev,
        x: dragStartRef.current.transformX + deltaX,
        y: dragStartRef.current.transformY + deltaY
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [transform.x, transform.y]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Mouse position relative to container center
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    // Calculate zoom factor (limit between 0.25x and 4x)
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.25, Math.min(4, transform.scale * zoomFactor));
    const scaleChange = newScale / transform.scale;
    
    // Adjust position to zoom towards mouse cursor
    const newX = transform.x - mouseX * (scaleChange - 1);
    const newY = transform.y - mouseY * (scaleChange - 1);
    
    setTransform({
      x: newX,
      y: newY,
      scale: newScale
    });
  }, [transform]);

  // Touch support
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      transformX: transform.x,
      transformY: transform.y
    };

    const handleTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartRef.current.x;
      const deltaY = touch.clientY - dragStartRef.current.y;
      
      setTransform(prev => ({
        ...prev,
        x: dragStartRef.current.transformX + deltaX,
        y: dragStartRef.current.transformY + deltaY
      }));
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }, [transform.x, transform.y]);

  return (
    <ViewerContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
    >
      <ContentContainer
        $isDragging={isDragging}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`
        }}
      >
        <TiledBackground />
        <GridOverlay $gridSizeX={gridSizeX} $gridSizeY={gridSizeY} />
        <MainImage 
          src={imageSrc}
          alt="Psychedelic Flora"
          draggable="false"
        />
      </ContentContainer>
    </ViewerContainer>
  );
}