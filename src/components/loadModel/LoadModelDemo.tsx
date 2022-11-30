import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Group, Object3D } from 'three';

function LoadModelDemo() {


    useGLTF.preload('/submarine.glb')


    //optional - stores a string representation of the model structure for model exploration purposes only
    //this is not fundamental to model display
    const [modelStructureText, setModelStructureText] = useState("");

    return (
        <div className="demo-container-with-side">

            <div>
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
export default LoadModelDemo

interface ModelProps {
    setModelStructureText: (text: string) => void
}
function Model(props: ModelProps) {
    const { scene } = useGLTF("/submarine.glb")

    //optional bonus - communicate the structure of the loaded model to some parent
    //you can remove this
    useEffect(() => {
        props.setModelStructureText(dumpObjectToTextLines(scene).join("\n"))
    }, [scene])

    return (
        <Stage intensity={0.3}>
            <primitive object={scene} />
        </Stage>
    )
}




//not crucial.  generates textual report of the model structure 
export function dumpObjectToConsoleAsString(root: Group) {
    console.log(dumpObjectToTextLines(root).join("\n"))
}

//types might not be quite right...
export function dumpObjectToTextLines(obj: Object3D, lines = [], isLast = true, prefix = '') {
    if (!obj || !obj.children) {
        return lines;
    }
    const localPrefix = isLast ? '└─' : '├─';
    //@ts-ignore
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child: Object3D, ndx: number) => {
        const isLast = ndx === lastNdx;
        dumpObjectToTextLines(child, lines, isLast, newPrefix);
    });
    return lines;
}