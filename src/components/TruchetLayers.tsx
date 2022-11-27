import { TruchetTiles } from './TruchetTiles';

interface TruchetLayersProps {
    opacity: number;
    /** not to exceed 32 !*/
    numCols: number;
}
export function TruchetLayers(props: TruchetLayersProps) {
    const layerOpacity = props.opacity;

    return (
        <group>
            <group position={[0, 0, 0]}>
                <TruchetTiles numCols={props.numCols} colour={"magenta"} opacity={layerOpacity} />
            </group>
            <group position={[0, -2, 0]}>
                <TruchetTiles numCols={props.numCols} colour={"dodgerblue"} opacity={layerOpacity} />
            </group>
            <group position={[0, 2, 0]}>
                <TruchetTiles numCols={props.numCols} colour={"lime"} opacity={layerOpacity} />
            </group>
        </group>
    );
}
