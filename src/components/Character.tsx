import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { useEffect, useRef, useState } from 'react'

function useControls () {
  const keys: { [key: string]: string } = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump'
  }
  
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setMovement(m => ({...m, [keys[e.code]]: true}))
    const handleKeyUp =   (e: KeyboardEvent) => setMovement(m => ({...m, [keys[e.code]]: false}))

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return movement
}

export function Character (props: any) {
  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()
  const speed = new THREE.Vector3()
  const SPEED = 2.5
  const JUMP = 3

  const { camera } = useThree()
  const [ref, api] = useSphere(_index => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 0],
    ...props
  }))

  const { forward, backward, left, right, jump } = useControls()
  const velocity = useRef([0, 0, 0]);
  
  useEffect(() => api.velocity.subscribe(v => velocity.current = v), []);

  useFrame((state) => {
    ref.current?.getWorldPosition(camera.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)

    speed.fromArray(velocity.current)
    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (jump && Math.abs(Number(velocity.current[1].toFixed(3))) < 0.025) {
      api.velocity.set(velocity.current[0], JUMP, velocity.current[2])
    }
  })

  // is this type cast really necessary?
  return <group>
    <mesh castShadow position={props.position} ref={ref as any}>
      <sphereGeometry args={props.args} />
      <meshStandardMaterial color='#ffff00' />
    </mesh>
  </group>
}
