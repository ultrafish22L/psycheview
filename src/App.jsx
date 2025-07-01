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
`

const ViewWindow = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
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