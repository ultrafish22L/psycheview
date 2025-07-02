import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AnimatedBackground } from './components/AnimatedBackground'
import { ImageViewer } from './components/ImageViewer'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

const Instructions = styled.div`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  color: white;
  padding: 15px 25px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: all 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  text-align: center;
  line-height: 1.4;
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(45deg, 
      rgba(255, 0, 255, 0.3), 
      rgba(0, 255, 255, 0.3), 
      rgba(255, 255, 0, 0.3),
      rgba(255, 0, 255, 0.3)
    );
    border-radius: 26px;
    z-index: -1;
    animation: borderShimmer 2s ease-in-out infinite alternate;
  }
  
  @keyframes borderShimmer {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`



function App() {
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <AnimatedBackground />
      
      <Instructions $visible={showInstructions}>
        🎨 Click & drag to pan • Scroll to zoom (0.25x - 4x) • Touch supported
      </Instructions>
      
      <ImageViewer imageSrc="/psychedelic-flora.jpg" />
    </Container>
  )
}

export default App