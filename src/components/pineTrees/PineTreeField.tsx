import { useMemo, useState } from 'react';
import { Vector2 } from 'three';
import { randFloat } from 'three/src/math/MathUtils';
import { PineTree } from './PineTree';

export function PineTreeField({ numTrees, radius }: { numTrees: number, radius: number }): JSX.Element {

    interface ITree {
        pos: Vector2;
        height: number;
    }
    const [activatedIds, setActivatedIds] = useState<Set<number>>(new Set());
    const treeInfos: ITree[] = useMemo(() => collect(numTrees, createTree), []);

    function createTree(): ITree {
        const pos = random2D().multiplyScalar(radius);
        return {
            pos,
            height: randFloat(0.6, 1.2)
        }
    }

    return (
        <>
            {treeInfos.map((treeInfo, ix) => (
                <PineTree
                    key={ix}
                    height={treeInfo.height}
                    position={[treeInfo.pos.x, 0, treeInfo.pos.y]}
                    isActive={activatedIds.has(ix)}
                    onPointerOver={() => setActivatedIds(prev => new Set(prev).add(ix))}
                />)
            )
            }
        </>
    );
}

/** Return a random Vector2  within a unit circle.  
 * Angle chosen randomly.  radius is sqrt(random()), so more likely to be away from the centre.
 * @note: not efficient e.g. Math.sqrt, Math.cos, and creates a Vector2 rather than reusing one 
 * */
function random2D(): Vector2 {
    const radius = Math.sqrt(Math.random());
    const angle = Math.random() * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return new Vector2(x, y);
}

function randAroundZero() {
    return Math.random() * 1 - 0.5
}

function collect<T>(num: number, createFn: (n: number) => T): T[] {
    let arr: T[] = [];
    for (let ix = 0; ix < num; ix++) {
        arr.push(createFn(ix))
    }
    return arr;
}
