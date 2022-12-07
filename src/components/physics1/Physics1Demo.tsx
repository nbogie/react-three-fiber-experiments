import { Debug, Physics, useBox, usePlane } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'


//This example is copied from
//https://codesandbox.io/s/z8e6m?file=/src/App.js:0-1261
//and then simplified (removing shadows and timeouts, adding Debug.)

export default function Physics1Demo() {
    const [readyToDrop, setReadyToDrop] = useState(false)

    return (
        <div className="demo-container-with-side">
            <div>

                <button
                    onClick={() => setReadyToDrop(true)}
                    disabled={readyToDrop}
                >drop last one</button>
            </div>

            <div className="canvas-container">

                <Canvas camera={{ position: [-5, 5, 5] }}>
                    <ambientLight />
                    <directionalLight />
                    <OrbitControls />
                    <Physics>
                        <Debug >
                            <GroundPlane />
                            <PhysicsCube position={[0, 5, 0]} />
                            <PhysicsCube position={[0.5, 7, -0.3]} />
                            <PhysicsCube position={[-0.5, 9, 0.3]} />
                            {readyToDrop && <PhysicsCube position={[-0.5, 10, 0.3]} />}
                        </Debug>
                    </Physics>
                </Canvas>
            </div>

        </div >
    )
}

function GroundPlane(props: {}) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
    return (
        //@ts-ignore
        <mesh ref={ref}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="tomato" />
        </mesh>
    )
}


interface CubeProps {
    position: [number, number, number]
}
function PhysicsCube(props: CubeProps) {
    const [ref] = useBox(() => ({ mass: 1, ...props }))
    return (
        //@ts-ignore
        <mesh ref={ref}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}
