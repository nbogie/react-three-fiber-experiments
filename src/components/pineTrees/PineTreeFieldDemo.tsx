import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PineTreeField } from './PineTreeField';

function PineTreeFieldDemo() {
  return (
    <div className="canvas-container">
      <Canvas>

        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 1, 2]} />
        <directionalLight color="skyblue" position={[-1, -3, 1]} />
        <group position={[0, -2, 0]}>
          <PineTreeField />
        </group>

        <OrbitControls autoRotate={true} autoRotateSpeed={3} rotateSpeed={1} />

      </Canvas>
    </div>
  )
}

export default PineTreeFieldDemo





