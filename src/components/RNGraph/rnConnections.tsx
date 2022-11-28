import { Vector2, Vector3 } from 'three';
import { IParticle } from './particle';

export interface IConnection {
    a: IParticle;
    b: IParticle;
    midpoint: Vector3;
    dist: number;
    angle: number;
    distToCentre: number;
}

export function createConnections(ps: IParticle[]): IConnection[] {
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
