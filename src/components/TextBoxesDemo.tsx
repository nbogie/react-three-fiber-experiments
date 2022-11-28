import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

export function TextBoxesDemo() {

    return (
        <div className="canvas-container">
            <Canvas>
                <OrbitControls autoRotate={true} />
                <Stage>
                    <CubesSet />
                </Stage>
            </Canvas>
        </div>
    );
}

function CubesSet() {
    function createParticles() {
        return collect(100, createParticle);
    }
    const particles = useMemo(createParticles, [])
    const cubeRef = useRef<Mesh>();

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.z += 0.01;
        }
    });
    return (
        <group>
            {particles.map(p =>
                <mesh position={p.pos}>
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
