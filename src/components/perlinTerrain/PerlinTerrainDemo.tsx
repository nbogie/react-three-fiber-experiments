import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { CubesGroup } from './CubesGroup';


export function PerlinTerrainDemo() {
    return (
        <Canvas>
            <Stage>
                <OrbitControls />
                <CubesGroup />
            </Stage>
        </Canvas>
    )
}


