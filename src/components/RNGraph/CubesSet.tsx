import { useFrame } from '@react-three/fiber';
import React from 'react';
import { useMemo, useRef } from 'react';
import { Mesh } from 'three';
import { Building } from './Building';
import { createConnections } from './rnConnections';
import { createParticle } from './particle';
import { collect } from './util';
import { Wall } from './Wall';

interface CubesSetProps {
    numCubes: number;
    setSelectedParticle: (n: number) => void;
    selectedParticle: number | null;
    wallOpacity: number;
}
export function CubesSet({ wallOpacity, numCubes, setSelectedParticle }: CubesSetProps) {
    function createParticles(n: number) {
        return collect(n, createParticle);
    }
    const particles = useMemo(() => createParticles(numCubes), [numCubes]);
    const connections = useMemo(() => createConnections(particles), [particles]);
    const groupRef = useRef<Mesh>();

    useFrame((frame, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += delta;
        }
    });
    return (
        <group>
            {particles.map((p, ix) => <Building key={ix} p={p} onPointerOver={(id) => setSelectedParticle(id)} />
            )}

            {connections.map((c, ix) => <Wall key={ix} c={c} opacity={wallOpacity} />
            )}
        </group>
    );
}

