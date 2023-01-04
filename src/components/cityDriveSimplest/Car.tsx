import { Vector3 } from "three";

export interface Car {
    position: Vector3;
    speed: number;
}
interface CarProps {
    data: Car;
}
export function Car({ data }: CarProps): JSX.Element {
    return (
        <group position={data.position} scale={[0.2, 0.1, 0.3]}>
            <mesh>
                <boxGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
        </group>
    );
}
