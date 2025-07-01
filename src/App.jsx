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
  background: url('/psychedelic-bg.jpg') center/cover;

  &::before {
    content: '';
    position: fixed;
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