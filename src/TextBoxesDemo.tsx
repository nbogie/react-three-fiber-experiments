import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';

export function TextBoxesDemo() {
    return (
        <div className="canvas-container">
            <Canvas>
                <OrbitControls autoRotate={true} />
                <Stage>
                    <mesh>
                        <meshStandardMaterial color={"dodgerblue"} />
                        <boxGeometry />
                    </mesh>
                    <mesh position-x={3}>
                        <meshStandardMaterial color={"tomato"} />
                        <boxGeometry />
                    </mesh>
                </Stage>
            </Canvas>
        </div>
    );
}
