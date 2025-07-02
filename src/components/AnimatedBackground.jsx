import styled, { keyframes } from 'styled-components';

const psychedelicFloat = keyframes`
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg) scale(1) skew(0deg);
    filter: hue-rotate(0deg) saturate(1) brightness(1);
  }
  16% { 
    transform: translate(150px, -80px) rotate(60deg) scale(1.3) skew(10deg);
    filter: hue-rotate(60deg) saturate(1.8) brightness(1.2);
  }
  33% { 
    transform: translate(-80px, 150px) rotate(120deg) scale(0.7) skew(20deg);
    filter: hue-rotate(120deg) saturate(2.2) brightness(0.8);
  }
  50% { 
    transform: translate(-150px, -80px) rotate(180deg) scale(1.1) skew(30deg);
    filter: hue-rotate(180deg) saturate(1.5) brightness(1.1);
  }
  66% { 
    transform: translate(80px, -150px) rotate(240deg) scale(0.9) skew(40deg);
    filter: hue-rotate(240deg) saturate(2.5) brightness(0.9);
  }
  83% { 
    transform: translate(120px, 120px) rotate(300deg) scale(1.2) skew(50deg);
    filter: hue-rotate(300deg) saturate(1.7) brightness(1.3);
  }
`;

const spiralDance = keyframes`
  0% { 
    transform: rotate(0deg) translateX(200px) rotate(0deg) scale(1);
    filter: hue-rotate(0deg) blur(0px);
  }
  25% { 
    transform: rotate(90deg) translateX(250px) rotate(-90deg) scale(1.4);
    filter: hue-rotate(90deg) blur(2px);
  }
  50% { 
    transform: rotate(180deg) translateX(300px) rotate(-180deg) scale(0.6);
    filter: hue-rotate(180deg) blur(4px);
  }
  75% { 
    transform: rotate(270deg) translateX(250px) rotate(-270deg) scale(1.2);
    filter: hue-rotate(270deg) blur(2px);
  }
  100% { 
    transform: rotate(360deg) translateX(200px) rotate(-360deg) scale(1);
    filter: hue-rotate(360deg) blur(0px);
  }
`;

const morphingBlob = keyframes`
  0%, 100% { 
    border-radius: 50% 50% 50% 50%;
    transform: rotate(0deg) scale(1) skew(0deg);
    filter: hue-rotate(0deg) saturate(1);
  }
  20% { 
    border-radius: 80% 20% 60% 40%;
    transform: rotate(72deg) scale(1.3) skew(15deg);
    filter: hue-rotate(72deg) saturate(1.8);
  }
  40% { 
    border-radius: 20% 80% 40% 60%;
    transform: rotate(144deg) scale(0.7) skew(30deg);
    filter: hue-rotate(144deg) saturate(2.2);
  }
  60% { 
    border-radius: 60% 40% 80% 20%;
    transform: rotate(216deg) scale(1.1) skew(45deg);
    filter: hue-rotate(216deg) saturate(1.5);
  }
  80% { 
    border-radius: 40% 60% 20% 80%;
    transform: rotate(288deg) scale(0.9) skew(60deg);
    filter: hue-rotate(288deg) saturate(2.5);
  }
`;

const kaleidoscopePulse = keyframes`
  0%, 100% { 
    opacity: 0.4; 
    transform: scale(1) rotate(0deg);
    filter: hue-rotate(0deg) saturate(1) brightness(1) contrast(1);
  }
  25% { 
    opacity: 0.8; 
    transform: scale(1.5) rotate(90deg);
    filter: hue-rotate(90deg) saturate(2) brightness(1.3) contrast(1.5);
  }
  50% { 
    opacity: 0.6; 
    transform: scale(0.5) rotate(180deg);
    filter: hue-rotate(180deg) saturate(2.5) brightness(0.7) contrast(2);
  }
  75% { 
    opacity: 0.9; 
    transform: scale(1.2) rotate(270deg);
    filter: hue-rotate(270deg) saturate(1.8) brightness(1.1) contrast(1.2);
  }
`;

const trippyWave = keyframes`
  0%, 100% { 
    transform: translateY(0px) scale(1) rotate(0deg) skewX(0deg);
    filter: hue-rotate(0deg) saturate(1) brightness(1);
  }
  14% { 
    transform: translateY(-30px) scale(1.2) rotate(51deg) skewX(10deg);
    filter: hue-rotate(51deg) saturate(1.6) brightness(1.2);
  }
  28% { 
    transform: translateY(-50px) scale(0.8) rotate(102deg) skewX(20deg);
    filter: hue-rotate(102deg) saturate(2.1) brightness(0.8);
  }
  42% { 
    transform: translateY(-60px) scale(1.4) rotate(153deg) skewX(30deg);
    filter: hue-rotate(153deg) saturate(1.4) brightness(1.3);
  }
  57% { 
    transform: translateY(-50px) scale(0.6) rotate(204deg) skewX(40deg);
    filter: hue-rotate(204deg) saturate(2.4) brightness(0.9);
  }
  71% { 
    transform: translateY(-30px) scale(1.1) rotate(255deg) skewX(50deg);
    filter: hue-rotate(255deg) saturate(1.7) brightness(1.1);
  }
  85% { 
    transform: translateY(-10px) scale(0.9) rotate(306deg) skewX(60deg);
    filter: hue-rotate(306deg) saturate(1.9) brightness(1.4);
  }
`;

const infiniteRotate = keyframes`
  0% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
  100% { transform: rotate(360deg) scale(1); filter: hue-rotate(360deg); }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  background: 
    radial-gradient(circle at 15% 85%, #ff00ff 0%, transparent 40%),
    radial-gradient(circle at 85% 15%, #00ffff 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, #ffff00 0%, transparent 30%),
    radial-gradient(circle at 25% 25%, #ff6600 0%, transparent 35%),
    radial-gradient(circle at 75% 75%, #6600ff 0%, transparent 35%),
    radial-gradient(circle at 10% 50%, #00ff66 0%, transparent 25%),
    radial-gradient(circle at 90% 50%, #ff0066 0%, transparent 25%),
    linear-gradient(45deg, #1a0033 0%, #000011 25%, #330011 50%, #001133 75%, #110033 100%);
  animation: ${infiniteRotate} 120s linear infinite;
`;

const PsychedelicOrb = styled.div`
  position: absolute;
  mix-blend-mode: screen;
  filter: blur(2px);
  
  &:nth-child(2) {
    width: 250px;
    height: 250px;
    top: 5%;
    left: 5%;
    background: radial-gradient(circle, rgba(255, 0, 255, 0.6) 0%, rgba(255, 100, 0, 0.4) 50%, transparent 80%);
    animation: ${psychedelicFloat} 15s ease-in-out infinite;
  }
  
  &:nth-child(3) {
    width: 180px;
    height: 180px;
    top: 70%;
    right: 15%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.7) 0%, rgba(100, 255, 0, 0.5) 50%, transparent 80%);
    animation: ${spiralDance} 20s ease-in-out infinite;
  }
  
  &:nth-child(4) {
    width: 220px;
    height: 220px;
    bottom: 15%;
    left: 25%;
    background: radial-gradient(circle, rgba(255, 255, 0, 0.6) 0%, rgba(255, 0, 100, 0.4) 50%, transparent 80%);
    animation: ${morphingBlob} 18s ease-in-out infinite;
  }
  
  &:nth-child(5) {
    width: 160px;
    height: 160px;
    top: 25%;
    right: 35%;
    background: radial-gradient(circle, rgba(255, 100, 0, 0.7) 0%, rgba(0, 255, 200, 0.5) 50%, transparent 80%);
    animation: ${trippyWave} 12s ease-in-out infinite;
  }
  
  &:nth-child(6) {
    width: 200px;
    height: 200px;
    bottom: 35%;
    right: 5%;
    background: radial-gradient(circle, rgba(100, 255, 100, 0.6) 0%, rgba(255, 0, 255, 0.4) 50%, transparent 80%);
    animation: ${psychedelicFloat} 25s ease-in-out infinite reverse;
  }
  
  &:nth-child(7) {
    width: 140px;
    height: 140px;
    top: 50%;
    left: 70%;
    background: radial-gradient(circle, rgba(0, 100, 255, 0.7) 0%, rgba(255, 255, 0, 0.5) 50%, transparent 80%);
    animation: ${spiralDance} 16s ease-in-out infinite reverse;
  }
  
  &:nth-child(8) {
    width: 190px;
    height: 190px;
    top: 80%;
    left: 60%;
    background: radial-gradient(circle, rgba(255, 0, 150, 0.6) 0%, rgba(0, 255, 100, 0.4) 50%, transparent 80%);
    animation: ${morphingBlob} 22s ease-in-out infinite reverse;
  }
`;

const KaleidoscopeRing = styled.div`
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: color-dodge;
  
  &:nth-child(9) {
    width: 400px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid rgba(255, 0, 255, 0.3);
    box-shadow: 
      0 0 20px rgba(255, 0, 255, 0.5),
      inset 0 0 20px rgba(0, 255, 255, 0.3);
    animation: ${kaleidoscopePulse} 10s ease-in-out infinite, ${infiniteRotate} 30s linear infinite;
  }
  
  &:nth-child(10) {
    width: 600px;
    height: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid rgba(0, 255, 255, 0.2);
    box-shadow: 
      0 0 30px rgba(0, 255, 255, 0.4),
      inset 0 0 30px rgba(255, 255, 0, 0.3);
    animation: ${kaleidoscopePulse} 15s ease-in-out infinite, ${infiniteRotate} 45s linear infinite reverse;
  }
  
  &:nth-child(11) {
    width: 800px;
    height: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgba(255, 255, 0, 0.15);
    box-shadow: 
      0 0 40px rgba(255, 255, 0, 0.3),
      inset 0 0 40px rgba(255, 0, 255, 0.2);
    animation: ${kaleidoscopePulse} 20s ease-in-out infinite, ${infiniteRotate} 60s linear infinite;
  }
`;

const PsychedelicParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(3px 3px at 25px 35px, rgba(255, 0, 255, 0.4), transparent),
    radial-gradient(2px 2px at 50px 80px, rgba(0, 255, 255, 0.5), transparent),
    radial-gradient(4px 4px at 100px 50px, rgba(255, 255, 0, 0.3), transparent),
    radial-gradient(1px 1px at 150px 90px, rgba(255, 100, 0, 0.6), transparent),
    radial-gradient(3px 3px at 180px 40px, rgba(100, 255, 100, 0.4), transparent),
    radial-gradient(2px 2px at 220px 120px, rgba(255, 0, 100, 0.5), transparent),
    radial-gradient(1px 1px at 260px 70px, rgba(100, 0, 255, 0.4), transparent),
    radial-gradient(4px 4px at 300px 110px, rgba(0, 255, 150, 0.3), transparent);
  background-repeat: repeat;
  background-size: 350px 150px;
  animation: ${trippyWave} 40s linear infinite, ${infiniteRotate} 80s linear infinite;
  opacity: 0.7;
  mix-blend-mode: screen;
`;

const FloatingGeometry = styled.div`
  position: absolute;
  mix-blend-mode: overlay;
  
  &:nth-child(12) {
    width: 0;
    height: 0;
    top: 20%;
    left: 80%;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 87px solid rgba(255, 0, 255, 0.3);
    animation: ${spiralDance} 25s ease-in-out infinite;
  }
  
  &:nth-child(13) {
    width: 80px;
    height: 80px;
    top: 75%;
    left: 10%;
    background: rgba(0, 255, 255, 0.3);
    transform: rotate(45deg);
    animation: ${morphingBlob} 20s ease-in-out infinite;
  }
  
  &:nth-child(14) {
    width: 0;
    height: 0;
    bottom: 30%;
    right: 25%;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-top: 70px solid rgba(255, 255, 0, 0.4);
    animation: ${psychedelicFloat} 18s ease-in-out infinite reverse;
  }
`;

export function AnimatedBackground() {
  return (
    <BackgroundContainer>
      <PsychedelicParticles />
      <PsychedelicOrb />
      <PsychedelicOrb />
      <PsychedelicOrb />
      <PsychedelicOrb />
      <PsychedelicOrb />
      <PsychedelicOrb />
      <PsychedelicOrb />
      <KaleidoscopeRing />
      <KaleidoscopeRing />
      <KaleidoscopeRing />
      <FloatingGeometry />
      <FloatingGeometry />
      <FloatingGeometry />
    </BackgroundContainer>
  );
}