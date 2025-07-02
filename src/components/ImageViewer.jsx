import { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const ViewerContainer = styled.div`
  position: relative;
  width: ${props => props.$containerWidth}px;
  height: ${props => props.$containerHeight}px;
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
  width: 1000%;
  height: 1000%;
  top: -450%;
  left: -450%;
  background: 
    radial-gradient(circle at 0% 0%, rgba(255, 0, 255, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.4) 0%, transparent 40%),
    radial-gradient(circle at 50% 0%, rgba(255, 255, 0, 0.3) 0%, transparent 45%),
    radial-gradient(circle at 75% 25%, rgba(255, 100, 0, 0.4) 0%, transparent 35%),
    radial-gradient(circle at 100% 0%, rgba(100, 255, 100, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 0% 50%, rgba(255, 0, 100, 0.4) 0%, transparent 40%),
    radial-gradient(circle at 25% 75%, rgba(100, 0, 255, 0.3) 0%, transparent 45%),
    radial-gradient(circle at 50% 100%, rgba(0, 255, 150, 0.4) 0%, transparent 35%),
    radial-gradient(circle at 75% 75%, rgba(255, 150, 0, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 100% 50%, rgba(150, 255, 255, 0.4) 0%, transparent 40%),
    linear-gradient(45deg, 
      rgba(255, 0, 255, 0.1) 0%, 
      rgba(0, 255, 255, 0.1) 12.5%, 
      rgba(255, 255, 0, 0.1) 25%, 
      rgba(255, 100, 0, 0.1) 37.5%, 
      rgba(100, 255, 100, 0.1) 50%, 
      rgba(255, 0, 100, 0.1) 62.5%, 
      rgba(100, 0, 255, 0.1) 75%, 
      rgba(0, 255, 150, 0.1) 87.5%, 
      rgba(255, 0, 255, 0.1) 100%
    ),
    repeating-conic-gradient(from 0deg at 50% 50%, 
      rgba(255, 0, 255, 0.2) 0deg, 
      rgba(0, 255, 255, 0.2) 45deg, 
      rgba(255, 255, 0, 0.2) 90deg, 
      rgba(255, 100, 0, 0.2) 135deg, 
      rgba(100, 255, 100, 0.2) 180deg, 
      rgba(255, 0, 100, 0.2) 225deg, 
      rgba(100, 0, 255, 0.2) 270deg, 
      rgba(0, 255, 150, 0.2) 315deg, 
      rgba(255, 0, 255, 0.2) 360deg
    );
  background-size: 
    150px 150px,
    200px 200px,
    175px 175px,
    225px 225px,
    160px 160px,
    190px 190px,
    210px 210px,
    180px 180px,
    170px 170px,
    195px 195px,
    300px 300px,
    400px 400px;
  background-repeat: repeat;
  opacity: 0.7;
  mix-blend-mode: screen;
  filter: saturate(1.5) contrast(1.2) brightness(1.1);
  animation: trippyShift 60s linear infinite;
  
  @keyframes trippyShift {
    0% { 
      filter: saturate(1.5) contrast(1.2) brightness(1.1) hue-rotate(0deg);
      transform: scale(1) rotate(0deg);
    }
    25% { 
      filter: saturate(2) contrast(1.5) brightness(0.9) hue-rotate(90deg);
      transform: scale(1.1) rotate(90deg);
    }
    50% { 
      filter: saturate(1.8) contrast(1.8) brightness(1.3) hue-rotate(180deg);
      transform: scale(0.9) rotate(180deg);
    }
    75% { 
      filter: saturate(2.2) contrast(1.3) brightness(1.0) hue-rotate(270deg);
      transform: scale(1.05) rotate(270deg);
    }
    100% { 
      filter: saturate(1.5) contrast(1.2) brightness(1.1) hue-rotate(360deg);
      transform: scale(1) rotate(360deg);
    }
  }
`;

const GridOverlay = styled.div`
  position: absolute;
  width: 1000%;
  height: 1000%;
  top: -450%;
  left: -450%;
  background-image: 
    linear-gradient(rgba(255, 0, 255, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px),
    linear-gradient(45deg, rgba(255, 255, 0, 0.2) 1px, transparent 1px),
    linear-gradient(-45deg, rgba(255, 100, 0, 0.2) 1px, transparent 1px);
  background-size: 
    ${props => props.$gridSizeX}px ${props => props.$gridSizeY}px,
    ${props => props.$gridSizeX}px ${props => props.$gridSizeY}px,
    ${props => props.$gridSizeX * 2}px ${props => props.$gridSizeY * 2}px,
    ${props => props.$gridSizeX * 2}px ${props => props.$gridSizeY * 2}px;
  pointer-events: none;
  mix-blend-mode: overlay;
  animation: gridPulse 45s ease-in-out infinite;
  
  @keyframes gridPulse {
    0%, 100% { 
      opacity: 0.6;
      filter: hue-rotate(0deg) saturate(1.5);
    }
    25% { 
      opacity: 0.8;
      filter: hue-rotate(90deg) saturate(2);
    }
    50% { 
      opacity: 0.4;
      filter: hue-rotate(180deg) saturate(1.8);
    }
    75% { 
      opacity: 0.9;
      filter: hue-rotate(270deg) saturate(2.2);
    }
  }
`;

const MainImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.$imageWidth}px;
  height: ${props => props.$imageHeight}px;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
`;

export function ImageViewer({ imageSrc }) {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, transformX: 0, transformY: 0 });

  // Load image and calculate container size to match image aspect ratio
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const aspectRatio = naturalWidth / naturalHeight;
      
      // Calculate maximum container size based on viewport
      const maxWidth = Math.min(window.innerWidth * 0.9, 1200);
      const maxHeight = Math.min(window.innerHeight * 0.8, 800);
      
      let containerWidth, containerHeight, imageDisplayWidth, imageDisplayHeight;
      
      // Fit container to image aspect ratio within viewport constraints
      if (aspectRatio > maxWidth / maxHeight) {
        // Image is wider - constrain by width
        containerWidth = maxWidth;
        containerHeight = maxWidth / aspectRatio;
        imageDisplayWidth = containerWidth;
        imageDisplayHeight = containerHeight;
      } else {
        // Image is taller - constrain by height
        containerHeight = maxHeight;
        containerWidth = maxHeight * aspectRatio;
        imageDisplayWidth = containerWidth;
        imageDisplayHeight = containerHeight;
      }
      
      setImageSize({ width: naturalWidth, height: naturalHeight });
      setContainerSize({ width: containerWidth, height: containerHeight });
      setDisplaySize({ width: imageDisplayWidth, height: imageDisplayHeight });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Calculate grid spacing based on display image size (1/4 of displayed dimensions)
  const gridSizeX = displaySize.width > 0 ? displaySize.width / 4 : 100;
  const gridSizeY = displaySize.height > 0 ? displaySize.height / 4 : 100;

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
      $containerWidth={containerSize.width}
      $containerHeight={containerSize.height}
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
          $imageWidth={displaySize.width}
          $imageHeight={displaySize.height}
        />
      </ContentContainer>
    </ViewerContainer>
  );
}