import { usePlane } from '@react-three/cannon'

export function Floor (props: any) {
  const [ref] = usePlane(_ => ({ type: 'Static', mass: 0, ...props }))
  return <mesh receiveShadow rotation={props.rotation} ref={ref as any}>
    <planeGeometry args={[1000, 1000]} />
    <meshStandardMaterial color={props.color} />
  </mesh>
}
