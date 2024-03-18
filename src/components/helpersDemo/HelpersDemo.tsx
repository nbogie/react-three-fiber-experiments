import { PivotControls, Stage, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import font from "../../assets/Anton-Regular.ttf";

export function HelpersDemo() {
    const [opt, setOpt] = useState<number>(6);
    return (
        <div className="demo-container-with-side">
            <div className="react-controls">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ix) => (
                    <React.Fragment key={ix}>
                        <h2 onClick={() => setOpt(ix)} key={ix}>
                            {ix}
                        </h2>
                        <br />
                    </React.Fragment>
                ))}
                <hr />
                Selected: {opt}
            </div>
            <div className="canvas-container">
                <Canvas>
                    {/* <OrbitControls autoRotate={false} /> */}
                    <Stage>
                        <PivotControls depthTest={false}>
                            <mesh position={[0, 0, 0]}>
                                <meshStandardMaterial color={"tomato"} />
                                <boxGeometry />
                            </mesh>
                            <Text
                                position-z={0.51}
                                font={font}
                                scale={2.5}
                                characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                            >
                                hello
                            </Text>
                        </PivotControls>
                    </Stage>
                </Canvas>
            </div>
        </div>
    );
}
