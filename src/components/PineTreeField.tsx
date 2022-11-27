import { useMemo, useState } from 'react';
import { PineTree } from './PineTree';

export function PineTreeField(): JSX.Element {
    const [activatedIds, setActivatedIds] = useState<Set<number>>(new Set());
    function genPositions(): [number, number][] {
        const arr: [number, number][] = [];
        for (let i = 0; i < 50; i++) {
            const x = randAroundZero() * 15;
            const y = randAroundZero() * 15;

            arr.push([x, y]);
        }
        return arr;
    }
    const positions: [number, number][] = useMemo(genPositions, []);
    return (
        <>
            {positions.map(([x, y], ix) => <PineTree
                key={ix}
                position={[x, 0, y]}
                isActive={activatedIds.has(ix)}
                onPointerOver={() => setActivatedIds(prev => new Set(prev).add(ix))}
            />)}
        </>
    );
}

function randAroundZero() {
    return Math.random() * 1 - 0.5
}