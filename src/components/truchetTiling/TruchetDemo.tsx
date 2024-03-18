import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { TruchetLayers } from "./TruchetLayers";

function TruchetDemo() {
    return (
        <div className="canvas-container">
            <Canvas>
                <Stage intensity={0}>
                    <TruchetLayers numCols={8} opacity={0.9} />
                </Stage>

                <OrbitControls
                    autoRotate={true}
                    autoRotateSpeed={3}
                    rotateSpeed={1}
                />
            </Canvas>
        </div>
    );
}

export default TruchetDemo;
