import { OrbitControls, Stage, Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useMemo, useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import font from "../assets/Anton-Regular.ttf"

export function TextBoxesDemo() {
    const [opt, setOpt] = useState<number>(6);
    return (
        <div className="demo-container-with-side">
            <div className="react-controls">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(ix => (
                    <React.Fragment key={ix}><h2
                        onClick={() => setOpt(ix)}
                        key={ix}
                    >Hello: {ix}</h2><br /></React.Fragment>
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
            {particles.map((p, ix) =>
                <group key={ix} position={p.pos} >
                    <mesh>
                        <meshStandardMaterial color={p.colour} />
                        <boxGeometry />
                    </mesh>

                    <Text position-z={0.51} font={font} scale={2.5} characters="abcdefghijklmnopqrstuvwxyz0123456789!">
                        {p.word}
                    </Text>
                </group>
            )}
        </group>
    );
}
interface IParticle {
    pos: Vector3,
    vel: Vector3,
    colour: string,
    word: string
}

function createParticle(): IParticle {
    return {
        pos: new Vector3(0, 1, 0).randomDirection().multiplyScalar(Math.random() * 10 - 5),
        vel: new Vector3(0, 0, 0),
        colour: Math.random() < 0.1 ? "dodgerblue" : "tomato",
        word: randomName()
    }
}

function randomName(): string {
    const consonants: string[] = "bcdfghjklmnpqrstvwxyz".split("");
    const verbs = "aeiou".split("");
    return pick(consonants).toUpperCase() + pick(verbs) + pick(consonants) + pick(verbs) + pick(consonants)


}
function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function collect<T>(num: number, createFn: (n: number) => T): T[] {
    let arr: T[] = [];
    for (let ix = 0; ix < num; ix++) {
        arr.push(createFn(ix))
    }
    return arr;
}
