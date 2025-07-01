import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { InfiniteCanvas } from './components/InfiniteCanvas'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, 
      rgba(128, 0, 128, 0.2) 0%,
      rgba(0, 128, 128, 0.2) 50%,
      rgba(128, 0, 0, 0.2) 100%);
    pointer-events: none;
    animation: gradientSpin 20s linear infinite;
  }

  @keyframes gradientSpin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.5); }
    100% { transform: rotate(360deg) scale(1); }
  }
`

const Controls = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  z-index: 1000;
`

const Button = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: shimmer 2s infinite;
    pointer-events: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }
`

const Instructions = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  font-family: 'Arial', sans-serif;
  opacity: ${props => props.$visible ? '1' : '0'};
  transition: opacity 0.3s ease;
`

function App() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(10, prev * 1.2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.1, prev * 0.8));
  };

  return (
    <Container>
      <Instructions $visible={showInstructions}>
        Use mouse wheel to zoom • Click and drag to pan • Explore beyond the edges
      </Instructions>
      
      <InfiniteCanvas
        initialImage="/psychedelic-flora.jpg"
        scale={scale}
        position={position}
        onScaleChange={setScale}
        onPositionChange={setPosition}
      />
      
      <Controls>
        <Button onClick={handleZoomIn}>Zoom In</Button>
        <Button onClick={handleZoomOut}>Zoom Out</Button>
        <Button onClick={handleReset}>Reset</Button>
      </Controls>
    </Container>
  )
}

export default App
