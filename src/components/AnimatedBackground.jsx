import styled, { keyframes } from 'styled-components';

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  25% { transform: translate(100px, -50px) rotate(90deg) scale(1.1); }
  50% { transform: translate(-50px, 100px) rotate(180deg) scale(0.9); }
  75% { transform: translate(-100px, -100px) rotate(270deg) scale(1.05); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  33% { transform: translate(-80px, 120px) rotate(120deg) scale(1.2); }
  66% { transform: translate(120px, 80px) rotate(240deg) scale(0.8); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  20% { transform: translate(60px, -80px) rotate(72deg) scale(1.1); }
  40% { transform: translate(-40px, 60px) rotate(144deg) scale(0.9); }
  60% { transform: translate(-80px, -40px) rotate(216deg) scale(1.15); }
  80% { transform: translate(40px, 80px) rotate(288deg) scale(0.85); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  background: radial-gradient(circle at 20% 80%, #ff00ff 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #00ffff 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #ffff00 0%, transparent 50%),
              linear-gradient(135deg, #1a0033 0%, #000011 50%, #330011 100%);
`;

const FloatingOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(1px);
  mix-blend-mode: screen;
  
  &:nth-child(1) {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    background: radial-gradient(circle, rgba(255, 0, 255, 0.4) 0%, transparent 70%);
    animation: ${float1} 20s ease-in-out infinite;
  }
  
  &:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 20%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%);
    animation: ${float2} 25s ease-in-out infinite;
  }
  
  &:nth-child(3) {
    width: 180px;
    height: 180px;
    bottom: 20%;
    left: 30%;
    background: radial-gradient(circle, rgba(255, 255, 0, 0.4) 0%, transparent 70%);
    animation: ${float3} 30s ease-in-out infinite;
  }
  
  &:nth-child(4) {
    width: 120px;
    height: 120px;
    top: 30%;
    right: 40%;
    background: radial-gradient(circle, rgba(255, 128, 0, 0.4) 0%, transparent 70%);
    animation: ${float1} 18s ease-in-out infinite reverse;
  }
  
  &:nth-child(5) {
    width: 160px;
    height: 160px;
    bottom: 40%;
    right: 10%;
    background: radial-gradient(circle, rgba(128, 255, 128, 0.4) 0%, transparent 70%);
    animation: ${float2} 22s ease-in-out infinite reverse;
  }
`;

const PulsingRing = styled.div`
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  
  &:nth-child(6) {
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${pulse} 8s ease-in-out infinite, ${rotate} 40s linear infinite;
  }
  
  &:nth-child(7) {
    width: 500px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${pulse} 12s ease-in-out infinite, ${rotate} 60s linear infinite reverse;
  }
`;

const ParticleField = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.2), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255, 0, 255, 0.3), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(0, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 0, 0.3), transparent),
    radial-gradient(2px 2px at 160px 30px, rgba(255, 255, 255, 0.2), transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: ${float1} 50s linear infinite;
  opacity: 0.6;
`;

export function AnimatedBackground() {
  return (
    <BackgroundContainer>
      <ParticleField />
      <FloatingOrb />
      <FloatingOrb />
      <FloatingOrb />
      <FloatingOrb />
      <FloatingOrb />
      <PulsingRing />
      <PulsingRing />
    </BackgroundContainer>
  );
}