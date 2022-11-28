import React from 'react';
import { IConnection } from "./rnConnections";

export function Wall({ c, opacity }: { c: IConnection; opacity: number; }): JSX.Element {
    const height = 1.3 ** Math.max(10 - c.distToCentre, 0.1) / 2;

    return (
        <group>

            {/* midpoint marker */}
            {/* <mesh
                position={[c.midpoint.x, c.midpoint.y, c.midpoint.z]}
            >
                <meshStandardMaterial color={'yellow'} />
                <boxGeometry args={[0.1, 0.5, 0.1]} />
            </mesh>
 */}

            <mesh
                position={[c.midpoint.x, c.midpoint.y + height / 2, c.midpoint.z]}
                rotation-y={-c.angle}
            >
                <meshStandardMaterial color={'tomato'} transparent={true} opacity={opacity} />
                <boxGeometry args={[c.dist, height, 0.1]} />
            </mesh>
        </group>

    );
}
