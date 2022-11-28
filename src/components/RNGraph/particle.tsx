import { Vector3 } from 'three';
import { randomSpread } from './util';


export interface IParticle {
    id: number;
    pos: Vector3;
    vel: Vector3;
    height: number;
    colour: string;
}
export function createParticle(ix: number): IParticle {
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
