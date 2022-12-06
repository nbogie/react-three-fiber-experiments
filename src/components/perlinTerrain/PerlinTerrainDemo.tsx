import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { CubesGroup } from './CubesGroup';
import { InstancedCubesGroup } from './InstancedCubesGroup';


export function PerlinTerrainDemo() {
    return (
        <Canvas>
            <Stage>
                <OrbitControls />
                {/* <CubesGroup /> */}
                {/* more efficient: */}
                <InstancedCubesGroup />
            </Stage>
        </Canvas>
    )
}


