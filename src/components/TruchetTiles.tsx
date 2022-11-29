import React, { useMemo } from 'react';
import { TileOrientation, TruchetTile } from './TruchetTile';

interface TruchetTilesProps {
    colour: string;
    opacity: number;
    /** not to exceed 32 !*/
    numCols: number;
}
/** A layer of truchet tiles (quarter-circles tile-type) laid out as 3d tubing. */
export function TruchetTiles(props: TruchetTilesProps): JSX.Element {
    if (props.numCols > 32) {
        throw new Error(`props.numCols too high: ${props.numCols}. I might blow up!`)
    }
    const xs = range(props.numCols)
    const zs = range(props.numCols)
    const numOrientations = xs.length * zs.length;
    const orientations = useMemo(() => collect(numOrientations, () => Math.floor(Math.random() * 4)), []);

    function getOrientationFor(x: number, z: number): TileOrientation {
        return orientations[x * zs.length + z] as TileOrientation;
    }

    return (
        <group>
            {xs.map(x => <React.Fragment key={x}>
                {zs.map(z => (
                    <TruchetTile key={z}
                        colour1={props.colour}
                        colour2={props.colour}
                        opacity={props.opacity}
                        orientation={getOrientationFor(x, z)}
                        position={[x * 2, 0, z * 2]}
                    />)
                )
                }
            </React.Fragment>
            )}
        </group>
    );
}



function collect<T>(n: number, fn: (ix: number) => T): T[] {
    return new Array(n).fill(null).map((junk, ix) => fn(ix))
}
/** Returns array of n elements, from 0 up to n-1 */
function range(n: number): number[] {
    return collect(n, (ix) => ix)
}