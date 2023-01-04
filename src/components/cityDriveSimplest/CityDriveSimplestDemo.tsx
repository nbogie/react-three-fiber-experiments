/* 
Of all of these examples this is the worst as it is animated and as far as possible makes no concessions to performance 

Rather it's intended to be as easy as possible for a junior developer to understand who knows some react basics but not yet refs. 
*/
import { PerspectiveCamera, Plane } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';
import { Buildings } from './Buildings';
import { Car } from './Car';


function CityDriveSimplestDemo() {
    const [camHeight, setCamHeight] = useState(1);
    return (
        <div className="demo-container-with-side">
            <div>

                <button onClick={() => setCamHeight(0.02)}>0.02</button>
                <button onClick={() => setCamHeight(0.2)}>0.2</button>
                <button onClick={() => setCamHeight(1)}>1</button>
                <button onClick={() => setCamHeight(5)}>5</button>
                <button onClick={() => setCamHeight(30)}>30</button>
            </div>
            <div className="canvas-container">

                <Canvas camera={{ position: [0, 1, -2], fov: 50 }}>
                    <CityDriveSimplest camHeight={camHeight} />
                </Canvas>
            </div >
        </div>
    )
}


export default CityDriveSimplestDemo;


interface CityDriveSimplestProps {
    camHeight: number;
}
export function CityDriveSimplest(props: CityDriveSimplestProps) {

    const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

    const [car, setCar] = useState<Car>({ position: new Vector3(0, 0, 4), speed: 0.1 });

    useFrame(({ mouse }) => {
        //Note: changing react-managed state in useFrame is NOT recommended for performance reasons - it will lead to too much re-rendering
        setCar((prev: Car) => ({
            ...prev,
            position: new Vector3(mouse.x / 3, prev.position.y, prev.position.z + -prev.speed)
        }));
        cameraRef.current.position.z = car.position.z + 4;
        cameraRef.current.position.y = props.camHeight;
        cameraRef.current.lookAt(new Vector3(0, 0, cameraRef.current.position.z - 10))
    })

    return (
        <group>

            <PerspectiveCamera
                makeDefault={true}
                position={[0, 1, 5]}
                near={0.1}
                far={100}
                ref={cameraRef} />
            <Car data={car} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Buildings
                numBuildings={100}
                recyclePoint={(cameraRef.current?.position.z ?? 0) + 10}
                horizonDist={-50}
            />
            <group position={[0, 0, car.position.z]}>
                <Ground />
                <Road />
                <axesHelper args={[1]} position={[-1, 2, -1]} />
                <gridHelper />
            </group>

        </group>

    );
}


function Ground(): JSX.Element {
    return (
        <Plane args={[10, 100]} rotation-x={-Math.PI / 2} >
            <meshStandardMaterial color={"gray"} />

        </Plane>
    )
}
function Road(): JSX.Element {
    return (

        <Plane args={[1, 100]} position={[0, 0.001, 0]} rotation-x={-Math.PI / 2}>
            <meshStandardMaterial color={"#111"} />
        </Plane>
    )
}

