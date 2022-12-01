import { useMemo, useRef } from 'react';
import { createNoise4D } from 'simplex-noise';
import { BoxGeometry, Group, MeshStandardMaterial } from 'three';
import { Box } from "./Box";

//Warning: inefficient!
export function CubesGroup() {
    const positions = useMemo(() => createPositions(20), []);

    const groupRef = useRef<Group>(null!);
    const geometry = new BoxGeometry();

    const normalMaterial = new MeshStandardMaterial({ color: "yellow" });
    const hoveredMaterial = new MeshStandardMaterial({ color: "magenta" });

    const boxes = positions.map((pos, ix) => (
        <Box key={ix}
            position={pos}
            geometry={geometry}
            hoveredMaterial={hoveredMaterial}
            normalMaterial={normalMaterial} />
    )
    );
    return (
        <group ref={groupRef}>
            {boxes}
        </group>
    );
}
function createPositions(numColumns: number): [number, number, number][] {
    //By default simplex-noise.js will use Math.random() to seed the noise.

    // initializing a new simplex instance
    // do this only once as it is relatively expensive
    const noise4D = createNoise4D();

    const range = numColumns;
    const posns: [number, number, number][] = [];
    const noiseScale = 0.07;

    const w = 0;
    for (let x = -range; x < range; x++) {
        for (let y = -range; y < range; y++) {
            for (let z = -range; z < range; z++) {
                const value4d = noise4D(x * noiseScale, y * noiseScale, z * noiseScale, w);
                if (value4d > 0.2) {
                    posns.push([x, y, z]);
                }
            }
        }
    }
    return posns;
}
