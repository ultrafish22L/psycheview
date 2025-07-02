import { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const ViewerContainer = styled.div`
  position: relative;
  width: ${props => props.$containerWidth}px;
  height: ${props => props.$containerHeight}px;
  margin: 20px auto;
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
    /* Islamic star pattern - 8-pointed stars */
    radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.15) 20%, transparent 25%),
    radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.12) 15%, transparent 20%),
    radial-gradient(circle at 100% 0%, rgba(255, 255, 0, 0.12) 15%, transparent 20%),
    radial-gradient(circle at 0% 100%, rgba(255, 100, 0, 0.12) 15%, transparent 20%),
    radial-gradient(circle at 100% 100%, rgba(100, 255, 100, 0.12) 15%, transparent 20%),
    
    /* Geometric interlacing pattern */
    linear-gradient(0deg, transparent 45%, rgba(255, 0, 100, 0.08) 47%, rgba(255, 0, 100, 0.08) 53%, transparent 55%),
    linear-gradient(60deg, transparent 45%, rgba(100, 0, 255, 0.08) 47%, rgba(100, 0, 255, 0.08) 53%, transparent 55%),
    linear-gradient(120deg, transparent 45%, rgba(0, 255, 150, 0.08) 47%, rgba(0, 255, 150, 0.08) 53%, transparent 55%),
    
    /* Hexagonal tessellation base */
    radial-gradient(ellipse 30px 52px at 50% 50%, rgba(255, 150, 0, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse 30px 52px at 0% 0%, rgba(150, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse 30px 52px at 100% 100%, rgba(255, 0, 150, 0.1) 0%, transparent 50%),
    
    /* Subtle arabesque curves */
    radial-gradient(ellipse 40px 20px at 25% 25%, rgba(255, 255, 0, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 40px 20px at 75% 75%, rgba(0, 255, 255, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 20px 40px at 75% 25%, rgba(255, 0, 255, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 20px 40px at 25% 75%, rgba(100, 255, 100, 0.06) 0%, transparent 70%);
    
  background-size: 
    120px 120px,
    240px 240px,
    240px 240px,
    240px 240px,
    240px 240px,
    80px 138px,
    80px 138px,
    80px 138px,
    60px 104px,
    120px 208px,
    120px 208px,
    160px 160px,
    160px 160px,
    160px 160px,
    160px 160px;
    
  background-position:
    60px 60px,
    0px 0px,
    120px 0px,
    0px 120px,
    120px 120px,
    0px 0px,
    40px 69px,
    80px 0px,
    30px 52px,
    60px 104px,
    90px 156px,
    0px 0px,
    80px 80px,
    40px 120px,
    120px 40px;
    
  background-repeat: repeat;
  opacity: 0.5;
  mix-blend-mode: multiply;
  filter: saturate(1.3) contrast(1.1) brightness(1.2);
  animation: islamicShift 90s ease-in-out infinite;
  
  @keyframes islamicShift {
    0%, 100% { 
      filter: saturate(1.3) contrast(1.1) brightness(1.2) hue-rotate(0deg);
      opacity: 0.5;
    }
    25% { 
      filter: saturate(1.6) contrast(1.3) brightness(1.0) hue-rotate(90deg);
      opacity: 0.6;
    }
    50% { 
      filter: saturate(1.4) contrast(1.4) brightness(1.3) hue-rotate(180deg);
      opacity: 0.4;
    }
    75% { 
      filter: saturate(1.8) contrast(1.2) brightness(1.1) hue-rotate(270deg);
      opacity: 0.7;
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
    linear-gradient(rgba(128, 128, 128, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(128, 128, 128, 0.15) 1px, transparent 1px);
  background-size: 
    ${props => props.$gridSizeX}px ${props => props.$gridSizeY}px,
    ${props => props.$gridSizeX}px ${props => props.$gridSizeY}px;
  pointer-events: none;
  mix-blend-mode: soft-light;
  animation: subtleGridShift 75s ease-in-out infinite;
  
  @keyframes subtleGridShift {
    0%, 100% { 
      opacity: 0.3;
      filter: hue-rotate(0deg) saturate(1.2);
    }
    33% { 
      opacity: 0.4;
      filter: hue-rotate(120deg) saturate(1.4);
    }
    66% { 
      opacity: 0.2;
      filter: hue-rotate(240deg) saturate(1.1);
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
      
      // Fill vertically with margin, calculate width from aspect ratio
      const containerHeight = window.innerHeight - 120; // 20px top + 20px bottom + 80px for instructions
      const containerWidth = Math.min(containerHeight * aspectRatio, window.innerWidth - 40);
      
      // If width constraint is hit, recalculate height
      const finalHeight = containerWidth / aspectRatio > containerHeight ? containerHeight : containerWidth / aspectRatio;
      const finalWidth = finalHeight * aspectRatio;
      
      setImageSize({ width: naturalWidth, height: naturalHeight });
      setContainerSize({ width: finalWidth, height: finalHeight });
      setDisplaySize({ width: naturalWidth, height: naturalHeight });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Fixed grid spacing for consistent pattern
  const gridSizeX = 200;
  const gridSizeY = 150;

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