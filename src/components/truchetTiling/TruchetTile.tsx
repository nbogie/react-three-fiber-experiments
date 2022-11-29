import * as THREE from "three";
import { Euler } from 'three';
export type TileOrientation = 0 | 1 | 2 | 3

interface TruchetTileProps {
    position: [number, number, number];
    orientation: 0 | 1 | 2 | 3;
    colour1: string;
    colour2: string;
    opacity: number;
}
export function TruchetTile(props: TruchetTileProps) {
    const curve = generateArcCurve();
    const colour1 = props.colour1;
    const colour2 = props.colour2;
    const tubeSegments = 10;
    const tubeRadius = 0.15;
    const opacity = props.opacity;

    return (
        <group position={props.position} rotation={new Euler(0, props.orientation * Math.PI / 2)}>
            <mesh position={[-1, 0, -1]} scale={[1, 1, 1]}>
                <tubeGeometry args={[curve, tubeSegments, tubeRadius, 50, false]} />
                <meshStandardMaterial transparent={true} opacity={opacity} args={[{ color: colour1 }]} />
            </mesh>

            <mesh position={[1, 0, 1]} scale={[1, 1, 1]} rotation={new Euler(0, -Math.PI)}>
                <tubeGeometry args={[curve, tubeSegments, tubeRadius, 50, false]} />
                <meshStandardMaterial transparent={true} opacity={opacity} args={[{ color: colour2 }]} />
            </mesh>
            {/* <mesh scale={2}>
              <boxGeometry />
              <meshStandardMaterial opacity={0.2} transparent={true} args={[{ color: "red" }]} />
            </mesh> */}
        </group>
    );

}

export function generateArcCurve() {
    let points = [];

    // Define points along Z axis
    const numSteps = 20;
    const startAngle = 0;
    const stopAngle = Math.PI / 2;
    const angleStep = (stopAngle - startAngle) / numSteps;
    const radius = 1;
    for (let angle = startAngle; angle <= stopAngle; angle += angleStep) {
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        points.push(
            new THREE.Vector3(
                x, 0, z)
        );
    }
    return new THREE.CatmullRomCurve3(points);
}
