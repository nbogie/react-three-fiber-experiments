
import { useMemo } from 'react';
import { Vector3 } from 'three';
import { randFloat, randFloatSpread } from 'three/src/math/MathUtils';

interface BuildingViewProps {
    data: IBuilding;
}



const palette = [
    "#5e3929",
    "#cd8c52",
    "#b7d1a3",
    "#dee8be",
    "#fcf7d3"
];
export function BuildingView(props: BuildingViewProps) {
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
    recyclePoint: number;
    horizonDist: number;
}
interface IBuilding {
    position: Vector3;
    height: number;
    colour: string;
}

export function Buildings(props: BuildingsProps) {

    function initBuildings(numBuildings: number): IBuilding[] {
        return collect(numBuildings, createBuilding);
    }

    const buildingsPlatonic = useMemo(() => initBuildings(props.numBuildings), []);
    const buildings = useMemo(() => wrapBuildings(), [props.recyclePoint]);

    function wrapBuildings() {
        return buildingsPlatonic.map((b) => {
            if (b.position.z > props.recyclePoint) {
                b.position.z = b.position.z + props.horizonDist;
            }
            return b;
        });
    }

    return (
        <group>
            {
                buildings.map((b, i) => < BuildingView key={i} data={b} />)
            }
        </group>
    );

}

function createBuilding(): IBuilding {
    const x = randFloat(1, 4) * pick([-1, 1]);
    const z = randFloatSpread(100);
    return {
        height: randFloat(0.5, 3),
        colour: pick(palette),
        position: new Vector3(x, 0, z)
    };
}


function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}


function collect<T>(num: number, createFn: (n: number) => T): T[] {
    let arr: T[] = [];
    for (let ix = 0; ix < num; ix++) {
        arr.push(createFn(ix));
    }
    return arr;
}
