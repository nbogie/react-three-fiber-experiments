import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useMemo, useState } from 'react';
import { Vector3 } from 'three';
import { lerp, randFloat, randFloatSpread } from 'three/src/math/MathUtils';

const palette = [
    "#5e3929",
    "#cd8c52",
    "#b7d1a3",
    "#dee8be",
    "#fcf7d3"
];
function CityDriveSimplestDemo() {

    return (
        <div className="canvas-container">
            <Canvas>
                <Stage>
                    <CityDriveSimplest />
                </Stage>

                <OrbitControls autoRotate={true} autoRotateSpeed={0.5} rotateSpeed={1} />
            </Canvas>
        </div >
    )
}

export default CityDriveSimplestDemo;


export function CityDriveSimplest() {

    return (
        <Buildings numBuildings={100} />

    );
}

interface BuildingViewProps {
    data: IBuilding;
}

function BuildingView(props: BuildingViewProps) {
    const heightOffsetVec = new Vector3(0, props.data.height / 2, 0);
    return (
        <mesh
            scale={[0.4, props.data.height, 0.4]}
            position={
                props.data.position.clone().add(heightOffsetVec)
            }
        >
            <boxGeometry />
            <meshStandardMaterial color={props.data.colour} />
        </mesh >
    )
}

interface BuildingsProps {
    numBuildings: number;
}
interface IBuilding {
    position: Vector3;
    height: number;
    colour: string;
}

function Buildings(props: BuildingsProps) {
    function initBuildings(numBuildings: number): IBuilding[] {
        return collect(numBuildings, createBuilding);

    }

    const [buildings, setBuildings] = useState(() => initBuildings(props.numBuildings));

    return (
        <group>
            {
                buildings.map((b, i) => < BuildingView data={b} />)
            }

        </group>
    );

}

function createBuilding(): IBuilding {
    const x = randFloat(1, 4) * pick([-1, 1]);
    const z = randFloatSpread(10);
    return {
        height: randFloat(0.5, 3),
        colour: pick(palette),
        position: new Vector3(x, 0, z)
    };
}


export function collect<T>(num: number, createFn: (n: number) => T): T[] {
    let arr: T[] = [];
    for (let ix = 0; ix < num; ix++) {
        arr.push(createFn(ix));
    }
    return arr;
}


function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}