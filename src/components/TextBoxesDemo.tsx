import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import { useMemo, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

export function TextBoxesDemo() {
    const [opt, setOpt] = useState<number>(6);
    return (
        <div className="text-boxes-demo-container">
            <div className="react-controls">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(ix => (
                    <React.Fragment key={ix}><h2 onClick={() => setOpt(ix)}>Hello: {ix}</h2><br /></React.Fragment>
                )
                )}
                <hr />
                Selected: {opt}
            </div>
            <div className="canvas-container">
                <Canvas>
                    <OrbitControls autoRotate={false} />
                    <Stage>
                        <CubesSet numCubes={opt * 10} />
                    </Stage>
                </Canvas>
            </div>
        </div>
    );
}
interface CubesSetProps {
    numCubes: number;
}
function CubesSet(props: CubesSetProps) {
    function createParticles(n: number) {
        return collect(n, createParticle);
    }
    const particles = useMemo(() => createParticles(props.numCubes), [props.numCubes])
    const groupRef = useRef<Mesh>();

    useFrame((frame, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += delta;
        }
    });
    return (
        <group>
            {particles.map(p =>
                <mesh position={p.pos} >
                    <meshStandardMaterial color={p.colour} />
                    <boxGeometry />
                </mesh>
            )}
        </group>
    );
}
interface IParticle {
    pos: Vector3,
    vel: Vector3,
    colour: string
}

function createParticle(): IParticle {
    return {
        pos: new Vector3(0, 1, 0).randomDirection().multiplyScalar(Math.random() * 10 - 5),
        vel: new Vector3(0, 0, 0),
        colour: Math.random() < 0.1 ? "dodgerblue" : "tomato"
    }
}

function collect<T>(num: number, createFn: (n: number) => T): T[] {
    let arr: T[] = [];
    for (let ix = 0; ix < num; ix++) {
        arr.push(createFn(ix))
    }
    return arr;
}
