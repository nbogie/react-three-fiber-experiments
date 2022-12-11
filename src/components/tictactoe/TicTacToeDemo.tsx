import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';

function posForSlot(i: number): [number, number, number] {
    return [i % 3, 0, Math.floor(i / 3)]
}

function colourForSlot(i: number): string {
    return i % 2 === 0 ? "gray" : "white"

}

export function TicTacToeDemo() {
    const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    return (
        <div className="demo-container-with-side">
            <div>
                side pane
                {selectedSlot}
            </div>

            <div className="canvas-container">
                <Canvas>
                    <OrbitControls autoRotate={false} />
                    <Stage>
                        <group >
                            {slots.map(slot => (
                                <BoardTile
                                    key={slot}
                                    isSelected={selectedSlot === slot}
                                    setSelected={setSelectedSlot}
                                    deselect={slot => (slot === selectedSlot) && setSelectedSlot(null)}
                                    slot={slot}
                                />)
                            )}
                        </group>
                    </Stage>
                </Canvas>
            </div>
        </div>
    );
}

interface BoardTileProps {
    slot: number;
    isSelected: boolean;
    setSelected: (slot: number) => void;
    deselect: (slot: number) => void;
}

function BoardTile(props: BoardTileProps) {
    const { slot, isSelected, setSelected, deselect } = props;
    return (
        <group
            onPointerOver={() => setSelected(slot)}
            onPointerOut={() => deselect(slot)}>

            <mesh position={posForSlot(slot)} scale={[0.8, 1, 0.8]}>
                <meshStandardMaterial color={colourForSlot(slot)} />
                <boxGeometry args={[1, 0.25, 1]} />
            </mesh>

            <mesh position={posForSlot(slot)}>
                <meshStandardMaterial
                    color={isSelected ? "magenta" : colourForSlot(slot)}
                    transparent={true}
                    opacity={isSelected ? 1 : 0}
                />
                <boxGeometry args={[1, 0.20, 1]} />
            </mesh>
        </group>

    )
}