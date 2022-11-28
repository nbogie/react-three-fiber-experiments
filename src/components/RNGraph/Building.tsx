import React from 'react';
import { IParticle } from "./particle";

interface BuildingProps {
    p: IParticle;
    onPointerOver: (id: number) => void;
}
export function Building({ p, onPointerOver }: BuildingProps): JSX.Element {
    return (
        <mesh position={[p.pos.x, p.pos.y + p.height / 2, p.pos.z]}
        // onPointerOver={() => onPointerOver(p.id)}
        >
            <meshStandardMaterial color={p.colour} />
            <boxGeometry args={[0.4, p.height, 0.4]} />
        </mesh>
    );
}
