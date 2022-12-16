import { OrbitControls, Stage, useAnimations, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
// const MODEL_PATH = "/stacy.glb";
// const ANIM_NAME = "rope"

//see https://codesandbox.io/s/temp-gltf-animations-forked-v2bd6k
const MODEL_PATH = "/boxanim.glb";
const ANIM_NAME = "spinaction"//"midbitaction", "spinaction"
//const ANIM_NAME = "firstaction"

export default function LoadModelWithAnimsDemo() {
    const [animNum, setAnimNum] = useState(1);

    function handlePlayAnim(givenNum: number): void {
        setAnimNum(givenNum);
    }

    useGLTF.preload(MODEL_PATH)
    return (

        <div className="demo-container-with-side">

            <div>

                <button onClick={() => handlePlayAnim(1)}>play 1</button>
                <button onClick={() => handlePlayAnim(2)}>play 2</button>
            </div>
            <div className="canvas-container">
                <Canvas>
                    <directionalLight />
                    <directionalLight position={[-2, 0, 0]} />
                    <ambientLight intensity={1} color={"pink"} />
                    <Suspense fallback={null}>
                        {/* <Stage intensity={0.2}> */}
                        <Model animNum={animNum} />
                        {/* </Stage> */}
                    </Suspense>

                    <OrbitControls
                    // autoRotate={true} autoRotateSpeed={3} rotateSpeed={1}
                    />
                </Canvas>
            </div>
        </div>
    )
}


interface ModelProps {
    animNum: number | null;
}
export function Model(props: ModelProps) {
    const { scene, animations } = useGLTF(MODEL_PATH);
    const { ref, actions, names } = useAnimations(animations)
    const { animNum } = props
    console.log("Model rerendering, ", { animNum, names, actions })
    useEffect(() => {
        playAnim1();
    }, [animNum]);

    function playAnim1() {
        console.log("playAnim1 called: ", { animNum, names, actions })
        // debugger
        const index = 0;
        if (!actions || !names) {
            console.log("no actions or no names")

            return;
        }
        // const action = actions[names[index]];
        const action = actions[ANIM_NAME]
        if (!action) {
            console.log("no action")
            return;
        }
        console.log("fading in animation: ", action)
        action.reset().fadeIn(0.5).play()
    }

    console.log({ animations })
    return (
        <primitive ref={ref} object={scene} />
    );
    //TODO: primitives have to be disposed of manually, I think.

}
