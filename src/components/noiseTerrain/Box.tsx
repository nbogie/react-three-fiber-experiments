import { useRef, useState } from "react";
import THREE from "three";
export function Box(
    props: JSX.IntrinsicElements["mesh"] & {
        hoveredMaterial: any;
        normalMaterial: any;
    }
) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // useFrame((state, delta) => (meshRef.current.rotation.x += 0.01))
    // const { normalMaterial, hoveredMaterial, ...mostProps } = props;
    return (
        <mesh
            material={hovered ? props.hoveredMaterial : props.normalMaterial}
            {...props}
            ref={meshRef}
            scale={clicked ? [2, 2, 2] : [1, 1, 1]}
            onClick={(event) => click(!clicked)}
        ></mesh>
    );
}
