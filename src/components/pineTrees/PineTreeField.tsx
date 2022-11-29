import { useMemo, useState } from 'react';
import { Vector2 } from 'three';
import { PineTree } from './PineTree';

export function PineTreeField({ numTrees, radius }: { numTrees: number, radius: number }): JSX.Element {

    const [activatedIds, setActivatedIds] = useState<Set<number>>(new Set());
    const positions: Vector2[] = useMemo(genPositions, []);

    function genPositions(): Vector2[] {
        const arr: Vector2[] = [];
        for (let i = 0; i < numTrees; i++) {
            const pos = random2D().multiplyScalar(radius);
            arr.push(pos);
        }
        return arr;
    }

    return (
        <>
            {positions.map((pos, ix) => (
                <PineTree
                    key={ix}
                    position={[pos.x, 0, pos.y]}
                    isActive={activatedIds.has(ix)}
                    onPointerOver={() => setActivatedIds(prev => new Set(prev).add(ix))}
                />)
            )
            }
        </>
    );
}

function random2D(): Vector2 {
    const radius = Math.random();
    const angle = Math.random() * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return new Vector2(x, y);
}

function randAroundZero() {
    return Math.random() * 1 - 0.5
}