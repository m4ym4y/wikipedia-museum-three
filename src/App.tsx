import React from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber'
import { Box } from './components/Box'
import { PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Character } from './components/Character'
import { Floor } from './components/Floor'

function App() {
  return (
    <Canvas shadows camera={{ fov: 90 }} style={{height: '100vh'}}>
      <PointerLockControls pointerSpeed={0.6} makeDefault />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Physics gravity={[0, -9.8, 0]}>
        <Character controls position={[0, 2, 0]} args={[0.5]} color="yellow" />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Floor rotation={[Math.PI / -2, 0, 0 ]} color="white"/>
      </Physics>
    </Canvas>
  );
}

export default App;
