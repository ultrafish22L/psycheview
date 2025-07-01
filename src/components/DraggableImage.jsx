import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: grab;
  background: url('/psychedelic-bg.jpg') center/cover;
  
  &:active {
    cursor: grabbing;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at center,
        rgba(255, 0, 255, 0.3) 0%,
        rgba(0, 255, 255, 0.3) 33%,
        rgba(255, 255, 0, 0.3) 66%,
        rgba(255, 0, 128, 0.3) 100%);
    mix-blend-mode: overlay;
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 0.8; }
    100% { opacity: 0.5; }
  }
`;

const MovableArea = styled.div`
  position: absolute;
  transform-origin: center;
  user-select: none;
`;

const Grid = styled.div`
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background-image: 
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
`;

export function DraggableImage({ imageSrc }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  
  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;
    
    const handleMouseMove = (e) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      setPosition({ x: newX, y: newY });
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.002;
    const newScale = Math.min(Math.max(0.1, scale + delta), 10);
    setScale(newScale);
  };

  return (
    <Container 
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      <MovableArea
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          width: '100%',
          height: '100%'
        }}
      >
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