import { Float, OrbitControls, Stage, Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, Vignette } from '@react-three/postprocessing';
import React, { useMemo, useRef, useState } from 'react';
import { Mesh, Vector2, Vector3 } from 'three';
import font from "../assets/Anton-Regular.ttf"

export function PostProcessingDemo() {
    const [opt, setOpt] = useState<number>(6);
    return (
        <div className="demo-container-with-side">
            <div className="react-controls">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(ix => (
                    <React.Fragment key={ix}><h2
                        onClick={() => setOpt(ix)}
                        key={ix}
                    >{ix}</h2><br /></React.Fragment>
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
                    <EffectComposer>
                        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
                        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                        <Noise opacity={0.12} />
                        {/* https://docs.pmnd.rs/react-postprocessing/effects/glitch */}
                        <Glitch delay={new Vector2(5, 15)} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />

                    </EffectComposer>

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

    return (
        <group>
            {particles.map((p, ix) =>
                <group key={ix} position={p.pos} >
                    <Float speed={3}>

                        <mesh>
                            <meshStandardMaterial color={p.colour} />
                            <boxGeometry />
                        </mesh>

                        <Text position-z={0.51} font={font} scale={2.5} characters="abcdefghijklmnopqrstuvwxyz0123456789!">
                            {p.word}
                        </Text>
                    </Float>
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
