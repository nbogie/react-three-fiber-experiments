import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3 } from 'three';


export function TubeDemo() {
    //TODO: useMemo to only do this once per mount.
    const curve = generateCurve();
    return (
        <div className="canvas-container">
            <Canvas>
                <Stage>
                    <OrbitControls autoRotate={true} autoRotateSpeed={3} rotateSpeed={1} />
                    <mesh>
                        <tubeGeometry args={[curve, 70, 0.2, 50, false]} />
                        <meshStandardMaterial args={[{ color: "magenta" }]} />
                    </mesh>
                </Stage>
            </Canvas>
        </div>
    )
}


function generateCurve(): CatmullRomCurve3 {
    let points = [];
    for (let z = 0; z < 30; z += 1) {
        const x = Math.random() - 0.5;
        const y = Math.random() - 0.5;
        points.push(new Vector3(x, y, z));
    }
    return new CatmullRomCurve3(points);
}