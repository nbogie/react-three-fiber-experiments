
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { Vector3 } from 'three';
import { createScale, createWorldPos, MovingBox } from './MovingBox';

interface IShape {
    pos: Vector3;
    desiredPos: Vector3;
    colour: string;
    scale: Vector3;
    desiredScale: Vector3;
}

export function TransitioningBoxesDemo() {
    return (
        // <div className="demo-container-with-side">

        //neill's original version in p5js:
        //https://openprocessing.org/sketch/925370

        <div className="canvas-container">
            <Canvas>
                <OrbitControls autoRotate={false} />
                {/* <Stage> */}

                <ambientLight intensity={0.2} />
                <directionalLight color={"white"} position={[100, 0, 20]} />
                <directionalLight color={"gray"} position={[-40, -30, -20]} />
                <TransitioningBoxes numObjects={5000} />
                {/* </Stage> */}
            </Canvas>
        </div>
        // </div>
    );
}



export function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}


function TransitioningBoxes({ numObjects }: { numObjects: number }): JSX.Element {
    const palette = useMemo(() => pickRandom(palettes), [])
    console.log({ palette })
    const positions: IShape[] = useMemo(() => createPositions(numObjects), []);

    function createPositions(numObjects: number): IShape[] {
        let arr = [];
        for (let i = 0; i < numObjects; i++) {
            arr.push(createObject(i, palette))
        }
        return arr;
    }





    const geom = <boxGeometry />;
    //shared materials
    const matsDict: { [k: string]: JSX.Element } = Object.fromEntries(palette.map(pStr => [pStr, <meshStandardMaterial color={pStr} />]))

    return (
        <group>
            {
                positions.map((p, ix) => (
                    <MovingBox key={ix} {...{ p, ix, geom, material: matsDict[p.colour] }} />
                ))
            }
        </group>
    )

}
const palettes = [
    [
        "#5e412f",
        "#fcebb6",
        "#78c0a8",
        "#f07818",
        "#f0a830"
    ],
    [
        "#413e4a",
        "#73626e",
        "#b38184",
        "#f0b49e",
        "#f7e4be"
    ],
    [
        "#aaff00",
        "#ffaa00",
        "#ff00aa",
        "#aa00ff",
        "#00aaff"
    ], [
        "#fa6a64",
        "#7a4e48",
        "#4a4031",
        "#f6e2bb",
        "#9ec6b8"
    ]
];
function createObject(i: number, pal: string[]): IShape {
    return {
        pos: createWorldPos(),
        desiredPos: createWorldPos(),
        scale: createScale(),
        desiredScale: createScale(),
        colour: pickRandom(pal)
    }
}

