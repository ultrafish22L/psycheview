import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DraggableImage } from './components/DraggableImage'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #000;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: 
      repeating-conic-gradient(
        from 0deg at 50% 50%,
        #ff00ff 0deg,
        #00ffff 30deg,
        #ffff00 60deg,
        #ff0080 90deg,
        #ff00ff 120deg
      );
    animation: outerRotate 20s linear infinite;
    opacity: 0.3;
  }

  &::after {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: 
      repeating-radial-gradient(
        circle at 50% 50%,
        transparent 0,
        transparent 100px,
        rgba(255, 0, 255, 0.2) 120px,
        transparent 140px
      );
    mix-blend-mode: screen;
    animation: outerPulse 15s ease-in-out infinite;
  }

  @keyframes outerRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes outerPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
  }
`

const ViewWindow = styled.div`
  position: relative;
  width: 80vmin;
  height: 60vmin;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  background: #000;
`

const Instructions = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  pointer-events: none;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.3s ease;
`

function App() {
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <Instructions $visible={showInstructions}>
        Click and drag to move the image
      </Instructions>
      
      <ViewWindow>
        <DraggableImage imageSrc="/psychedelic-flora.jpg" />
      </ViewWindow>
    </Container>
  )
}

export default App