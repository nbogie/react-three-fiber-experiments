import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { randFloat } from "three/src/math/MathUtils";
import { pickRandom } from "./TransitioningBoxesDemo";

export function MovingBox(props: any) {
    const { p, ix, geom, material } = props;

    const transitionSpeed = 1;
    const transitionProbability = 0.0002;

    const meshRef = useRef<Mesh>(null!); //won't be null by time of useFrame fn
    useFrame((state, delta, frame) => {
        meshRef.current!.position.lerp(
            meshRef.current!.userData.desiredPos,
            delta * transitionSpeed
        );
        meshRef.current!.scale.lerp(
            meshRef.current!.userData.desiredScale,
            delta * transitionSpeed
        );

        if (Math.random() < transitionProbability) {
            meshRef.current!.userData.desiredPos = createWorldPos();
            meshRef.current!.userData.desiredScale = createScale();
        }
    });

    return (
        <mesh
            ref={meshRef!}
            key={ix}
            userData={{
                desiredPos: createWorldPos(),
                desiredScale: createScale(),
            }}
            position={[p.pos.x, p.pos.y, p.pos.z]}
            scale={[p.scale.x, p.scale.y, p.scale.z]}
        >
            {geom}
            {material}
        </mesh>
    );
}
export function createScale(): Vector3 {
    const randLen = () =>
        pickRandom([
            0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 2,
            4,
        ]) *
            7 +
        randFloat(0.0001, 0.0003);
    //TODO:add tiny random offset to each length to make "z-fighting" less likely
    return new Vector3(randLen(), randLen(), randLen());
}
function createWorldPosOnSphere(radius: number): Vector3 {
    return new Vector3().randomDirection().multiplyScalar(radius);
}
function createWorldPosWithinSphere(radius: number): Vector3 {
    return new Vector3()
        .randomDirection()
        .multiplyScalar(Math.sqrt(Math.random()))
        .multiplyScalar(radius);
}
export function createWorldPos(): Vector3 {
    return createWorldPosOnSphere(70);
}
