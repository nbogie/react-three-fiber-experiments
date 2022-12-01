import { useEffect, useMemo, useRef } from 'react';
import { createNoise4D } from 'simplex-noise';
import { BoxGeometry, Group, MeshStandardMaterial, Object3D } from 'three';

//Alternative with instancing:
//https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance#instancing

export function InstancedCubesGroup() {
    const positions = useMemo(() => createPositions(70), []);
    const count = positions.length;

    const groupRef = useRef<Group>(null!);


    const ref = useRef()
    const temp = new Object3D();

    useEffect(() => {
        // Set positions
        for (let i = 0; i < count; i++) {
            const pos = positions[i];
            temp.position.set(pos[0], pos[1], pos[2])
            temp.updateMatrix()
            if (ref.current) {
                //@ts-ignore
                ref.current.setMatrixAt(i, temp.matrix)
            }
        }
        // Update the instance
        //@ts-ignore
        ref.current.instanceMatrix.needsUpdate = true
    }, [])

    const geometry = new BoxGeometry();

    const normalMaterial = new MeshStandardMaterial({ color: "yellow" });
    const hoveredMaterial = new MeshStandardMaterial({ color: "magenta" });


    return (
        <group ref={groupRef}>
            {/* @ts-ignore */}
            <instancedMesh ref={ref} args={[null, null, count]}>
                <boxGeometry />
                <meshPhongMaterial />
            </instancedMesh>
        </group>
    );
}
function createPositions(columnCount: number): [number, number, number][] {
    //By default simplex-noise.js will use Math.random() to seed the noise.

    // initializing a new simplex instance
    // do this only once as it is relatively expensive
    const noise4D = createNoise4D();

    const range = columnCount;
    const posns: [number, number, number][] = [];
    const noiseScale = 0.04;
    const cellSize = 0.5;
    const w = 0;
    for (let x = -range; x < range; x++) {
        for (let y = -range; y < range; y++) {
            for (let z = -range; z < range; z++) {
                const value4d = noise4D(x * noiseScale, y * noiseScale, z * noiseScale, w);
                if (value4d > 0.2) {
                    posns.push([x * cellSize, y * cellSize, z * cellSize]);
                }
            }
        }
    }
    return posns;
}
