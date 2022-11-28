import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import { useMemo, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

export function RNGraphDemo() {

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
    const connections = useMemo(() => [], [])
    const groupRef = useRef<Mesh>();

    useFrame((frame, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += delta;
        }
    });
    return (
        <group>
            {particles.map((p, ix) => {
                return (
                    <mesh key={ix} position={[p.pos.x, p.pos.y + p.height / 2, p.pos.z]} >
                        <meshStandardMaterial color={p.colour} />
                        <boxGeometry args={[1, p.height, 1]} />
                    </mesh>)
            })}
        </group>
    );
}
interface IParticle {
    id: number;
    pos: Vector3;
    vel: Vector3;
    height: number;
    colour: string;
}

function randomSpread(range: number): number {
    return range * Math.random() - 0.5;
}

function createParticle(ix: number): IParticle {
    function createPos() {
        const v = new Vector3(0, 1, 0).randomDirection().multiplyScalar(randomSpread(15))
        return new Vector3(v.x, 0, v.z)
    }
    return {
        id: ix,
        pos: createPos(),
        height: Math.random() * 5,
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
