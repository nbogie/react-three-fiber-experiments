import { PerspectiveCamera, Plane } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';
import { randFloat, randFloatSpread } from 'three/src/math/MathUtils';

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
            <Canvas camera={{ position: [0, 1, -2], fov: 50 }}>

                <CityDriveSimplest />
                {/* <OrbitControls autoRotate={true} autoRotateSpeed={0.5} rotateSpeed={1} /> */}
            </Canvas>
        </div >
    )
}


export default CityDriveSimplestDemo;


interface Car {
    position: Vector3;
    speed: number;
}

export function CityDriveSimplest() {

    const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

    const [car, setCar] = useState<Car>({ position: new Vector3(0, 0, 0), speed: 0.01 });

    useFrame(() => {
        //Note: changing react-managed state in useFrame is NOT recommended for performance reasons - it will lead to too much re-rendering
        setCar((prev) => ({ ...prev, position: prev.position.clone().add(new Vector3(0, 0, -prev.speed)) }));
        cameraRef.current.position.z += -car.speed;
        cameraRef.current.lookAt(new Vector3(0, 0, cameraRef.current.position.z - 10))

    })

    return (
        <group>

            <PerspectiveCamera
                makeDefault={true}
                position={[0, 2, 10]}
                near={0.1}
                far={100}
                ref={cameraRef} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Buildings numBuildings={100} />

        </group>

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
                buildings.map((b, i) => < BuildingView key={i} data={b} />)
            }
            <Road />
            <Ground />
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
function Road(): JSX.Element {
    return (
        <Plane args={[10, 10]} rotation-x={-Math.PI / 2} >
            <meshStandardMaterial color={"green"} />

        </Plane>
    )
}
function Ground(): JSX.Element {
    return (

        <Plane args={[1, 10]} position={[0, 0.001, 0]} rotation-x={-Math.PI / 2}>
            <meshStandardMaterial color={"#333"} />
        </Plane>
    )
}