import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { pinePalette } from "./pinePalette";
import { PineTreeField } from "./PineTreeField";

function PineTreeFieldDemo() {
    const radius = 15;

    return (
        <div className="canvas-container">
            <Canvas>
                <ambientLight intensity={0.1} />
                <directionalLight color="white" position={[0, 1, -10]} />
                {/* <directionalLight color="skyblue" position={[-1, -3, 1]} /> */}

                <group position={[0, -1.1, 0]}>
                    <PineTreeField numTrees={100} radius={radius * 0.9} />
                </group>

                <group position={[0, -2, 0]}>
                    <Ground radius={radius} />
                </group>

                <group position={[0, 2, -100]}>
                    <Moon size={40} />
                </group>

                <OrbitControls
                    autoRotate={true}
                    autoRotateSpeed={0.3}
                    rotateSpeed={1}
                />
            </Canvas>
        </div>
    );
}

export default PineTreeFieldDemo;

function Ground({ radius }: { radius: number }) {
    const numSides = 16;

    return (
        <group>
            <mesh>
                <meshStandardMaterial color={pinePalette.grassColour} />
                <cylinderGeometry args={[radius, radius, 0.4, numSides]} />
            </mesh>

            <mesh position-y={-0.8}>
                <meshStandardMaterial color={pinePalette.groundColour} />
                <cylinderGeometry
                    args={[radius, radius * 0.8, 1.5, numSides]}
                />
            </mesh>
        </group>
    );
}

function Moon({ size }: { size: number }): JSX.Element {
    const detail = 40;

    return (
        <mesh>
            <meshBasicMaterial color={pinePalette.moonColour} />
            <sphereGeometry args={[size, detail, detail]} />
        </mesh>
    );
}
