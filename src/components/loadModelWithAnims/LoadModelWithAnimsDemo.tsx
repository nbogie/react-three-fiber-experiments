import { OrbitControls, Stage, useAnimations, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';


export default function LoadModelWithAnimsDemo() {
    const [animState, setAnimState] = useState(false);

    function handleClicked() {
        setAnimState(p => !p);
    }

    useGLTF.preload('/boxanim.glb')
    return (

        <div className="demo-container-with-side">


            <button onClick={handleClicked}></button>
            <div className="canvas-container">
                <Canvas>
                    <Suspense fallback={null}>
                        <Stage intensity={0.2}>
                            <Model animState={animState} />
                        </Stage>
                    </Suspense>

                    <OrbitControls autoRotate={true} autoRotateSpeed={3} rotateSpeed={1} />
                </Canvas>
            </div>
        </div>
    )
}


interface ModelProps {
    animState: boolean;
}
export function Model(props: ModelProps) {
    const { scene, animations } = useGLTF("/boxanim.glb");
    const { ref, actions, names } = useAnimations(animations)
    const animState = { props }
    console.log("Model rerendering, ", { animState })
    useEffect(() => {
        playAnim1();
    }, [animState]);

    function playAnim1() {
        console.log("playAnim1")
        const index = 0;
        if (!actions || !names) {
            console.log("no actions or no names")

            return;
        }
        const action = actions[names[index]];
        if (!action) {
            console.log("no action")
            return;
        }
        console.log("fading in animation: ", action)
        action.reset().fadeIn(0.5).play()
    }

    console.log({ animations })
    return (
        <Stage intensity={0.3}>
            <primitive object={scene} />
        </Stage>
    );
    //TODO: primitives have to be disposed of manually, I think.

}
