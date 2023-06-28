import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Model } from './Model';

function LoadModelFancierDemo() {


    useGLTF.preload('/submarine.glb')


    //optional - stores a string representation of the model structure for model exploration purposes only
    //this is not fundamental to model display
    const [modelStructureText, setModelStructureText] = useState("");

    return (
        <div className="demo-container-with-side">

            <div className="leftPane">
                <h2>Model structure:</h2>
                <pre>
                    {modelStructureText}
                </pre>
            </div>


            <div className="canvas-container">
                <Canvas>
                    <Suspense fallback={null}>
                        <Stage intensity={0.2}>
                            <Model setModelStructureText={setModelStructureText} />
                        </Stage>
                    </Suspense>

                    <OrbitControls autoRotate={true} autoRotateSpeed={3} rotateSpeed={1} />
                </Canvas>
            </div>
        </div>
    )
}
export default LoadModelFancierDemo


