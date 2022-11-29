import { pinePalette } from "./pinePalette";

interface PineTreeProps {
    position: [number, number, number];
    onPointerOver: () => void;
    isActive: boolean;
    height: number
}
export function PineTree({ position, isActive, onPointerOver, height }: PineTreeProps) {
    const [x, y, z] = position;
    const opacity = isActive ? 1 : 0.1;
    return (
        <group onPointerOver={onPointerOver} scale={[1, height, 1]}>

            <mesh
                scale={[0.5, 1, 0.5]}
                position={[x, y, z]}
            >
                <coneGeometry />
                <meshStandardMaterial args={[{ color: pinePalette.treeColour, transparent: true, opacity }]} />
            </mesh>

            <mesh
                scale={[0.3, 0.6, 0.3]}
                position={[x, y + 0.5, z]}
            >
                <coneGeometry />
                <meshStandardMaterial args={[{ color: pinePalette.treeColour, transparent: true, opacity }]} />
            </mesh>

            <mesh
                scale={[0.2, 0.5, 0.2]}
                position={[x, y - 0.5, z]}
            >
                <cylinderGeometry />
                <meshStandardMaterial args={[{ color: pinePalette.trunkColour, transparent: true, opacity }]} />
            </mesh>

        </group>

    );
}
