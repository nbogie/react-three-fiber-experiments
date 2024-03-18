import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { Vector3 } from "three";
import { randFloat, randFloatSpread } from "three/src/math/MathUtils";

//not the way to do things.  Don't cause re-renders from within a loop (e.g. useFrame)
//Instead, use refs and mutate:
//https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls#%E2%9C%85-instead,-use-refs-and-mutate
interface IShape {
    pos: Vector3;
    desiredPos: Vector3;
    colour: string;
    dim: Vector3;
    desiredDim: Vector3;
}
export function TransitioningBoxesBadDemo() {
    return (
        <div className="canvas-container">
            <Canvas>
                <OrbitControls autoRotate={false} />
                <Stage>
                    <TransitioningBoxesBad />
                </Stage>
            </Canvas>
        </div>
    );
}

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function createPositions() {
    let arr = [];
    for (let i = 0; i < 1000; i++) {
        arr.push(createObject(i));
    }
    return arr;
}

const palette = ["#5e412f", "#fcebb6", "#78c0a8", "#f07818", "#f0a830"];

function createDim(): Vector3 {
    return new Vector3(randFloat(0.1, 4), randFloat(0.1, 4), randFloat(0.1, 4));
}
function createWorldPos(): Vector3 {
    return new Vector3(
        randFloatSpread(40),
        randFloatSpread(40),
        randFloatSpread(40)
    );
}

function createObject(i: number): IShape {
    return {
        pos: createWorldPos(),
        desiredPos: createWorldPos(),
        dim: createDim(),
        desiredDim: createDim(),
        colour: pickRandom(palette),
    };
}

function TransitioningBoxesBad(): JSX.Element {
    throw new Error("don't use this code - it's very inefficient");

    const [counter, setCounter] = useState(0);
    console.log("tb rerender: " + counter);
    const positions: IShape[] = useMemo(createPositions, []);

    useFrame((state, delta, frame) => {
        for (let p of positions) {
            p.pos.lerp(p.desiredPos, 0.01);
            p.dim.lerp(p.desiredDim, 0.01);
        }
        for (let p of positions) {
            if (Math.random() < 0.01) {
                // p.desiredPos = createWorldPos();
                p.desiredDim = createDim();
            }
        }

        setCounter((p) => p + 1); //cause rerender.  do this with refs, don't cause re-render.
        //invalidate should do the same.
    });

    const geom = <boxGeometry />;
    return (
        <group>
            {positions.map((p, ix) => (
                <mesh
                    key={ix}
                    position={[p.pos.x, p.pos.y, p.pos.z]}
                    scale={[p.dim.x, p.dim.y, p.dim.z]}
                >
                    <meshStandardMaterial color={p.colour} />
                    {geom}
                </mesh>
            ))}
        </group>
    );
}
