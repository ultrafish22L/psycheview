import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DraggableImage } from './components/DraggableImage'

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
    background: 
      radial-gradient(circle at center,
        rgba(255, 0, 255, 0.8) 0%,
        rgba(0, 255, 255, 0.8) 33%,
        rgba(255, 255, 0, 0.8) 66%,
        rgba(255, 0, 128, 0.8) 100%),
      linear-gradient(45deg,
        rgba(128, 0, 255, 0.4) 0%,
        rgba(255, 0, 128, 0.4) 100%);
    pointer-events: none;
    animation: gradientSpin 20s linear infinite;
  }

  @keyframes gradientSpin {
    0% { 
      transform: rotate(0deg) scale(1);
      filter: hue-rotate(0deg);
    }
    50% { 
      transform: rotate(180deg) scale(1.5);
      filter: hue-rotate(180deg);
    }
    100% { 
      transform: rotate(360deg) scale(1);
      filter: hue-rotate(360deg);
    }
  }
`

const ViewWindow = styled.div`
  width: 80vmin;
  height: 60vmin;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
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