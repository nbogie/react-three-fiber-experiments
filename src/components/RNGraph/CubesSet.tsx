import { useFrame } from '@react-three/fiber';
import React from 'react';
import { useMemo, useRef } from 'react';
import { Mesh, Vector2, Vector3 } from 'three';
import { Building } from './Building';
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

export interface IParticle {
    id: number;
    pos: Vector3;
    vel: Vector3;
    height: number;
    colour: string;
}
function randomSpread(range: number): number {
    return range * Math.random() - 0.5;
}
function createParticle(ix: number): IParticle {
    function createPos() {
        const v = new Vector3(0, 1, 0).randomDirection().multiplyScalar(randomSpread(15));
        return new Vector3(v.x, 0, v.z);
    }
    return {
        id: ix,
        pos: createPos(),
        height: 0.1,
        vel: new Vector3(0, 0, 0),
        colour: Math.random() < 0.1 ? "dodgerblue" : "tomato"
    };
}
function collect<T>(num: number, createFn: (n: number) => T): T[] {
    let arr: T[] = [];
    for (let ix = 0; ix < num; ix++) {
        arr.push(createFn(ix));
    }
    return arr;
}
export interface IConnection {
    a: IParticle;
    b: IParticle;
    midpoint: Vector3;
    dist: number;
    angle: number;
    distToCentre: number;
}
function createConnections(ps: IParticle[]): IConnection[] {
    const arr: IConnection[] = [];
    for (let i = 0; i < ps.length - 1; i++) {
        for (let j = i + 1; j < ps.length; j++) {
            const a = ps[i];
            const b = ps[j];
            const dist = a.pos.distanceTo(b.pos);
            if (nothingElseNearerThan(dist, a, b)) {
                const midpoint = a.pos.clone().lerp(b.pos, 0.5);
                const angle = new Vector2(b.pos.x, b.pos.z).sub(new Vector2(a.pos.x, a.pos.z)).angle();
                const distToCentre = midpoint.length();
                const obj = { a, b, midpoint, angle, dist, distToCentre };
                arr.push(obj);
            }

        }

    }
    function nothingElseNearerThan(pairDist: number, a: IParticle, b: IParticle): boolean {
        return !ps.some(particle3 => particle3.id !== a.id &&
            particle3.id !== b.id &&
            (particle3.pos.distanceTo(a.pos) < pairDist &&
                particle3.pos.distanceTo(b.pos) < pairDist)
        );
    }



    return arr;
}
