import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function LoadModelDemo() {
    useGLTF.preload("/submarine.glb");

    return (
        <div className="canvas-container">
            <Canvas>
                <Suspense fallback={null}>
                    <Stage intensity={0.2}>
                        <Model />
                    </Stage>
                </Suspense>

                <OrbitControls
                    autoRotate={true}
                    autoRotateSpeed={3}
                    rotateSpeed={1}
                />
            </Canvas>
        </div>
    );
}

export function Model() {
    const { scene } = useGLTF("/submarine.glb");

    return (
        <Stage intensity={0.3}>
            <primitive object={scene} />
        </Stage>
    );
    //TODO: primitives have to be disposed of manually, I think.
}
