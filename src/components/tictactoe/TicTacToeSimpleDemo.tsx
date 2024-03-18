import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

//This example doesn't run the full game, just demos a simple board with selectable squares.
export function TicTacToeSimpleDemo() {
    const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
    const [disabledSlots, setDisabledSlots] = useState<number[]>([]);

    function resetGame() {
        setSelectedSlot(null);
        setDisabledSlots([]);
    }
    function handleSlotClicked(slot: number) {
        setDisabledSlots((prevs) => {
            if (!prevs.includes(slot)) {
                return [...prevs, slot];
            } else {
                return prevs;
            }
        });
        setSelectedSlot(null);
    }
    return (
        <div className="demo-container-with-side">
            <div>
                Selected slot: {selectedSlot}
                <br />
                <button onClick={resetGame}>Reset</button>
            </div>

            <div className="canvas-container">
                <Canvas>
                    <OrbitControls autoRotate={false} />
                    <Stage>
                        <group>
                            {slots.map((slot) => (
                                <BoardTile
                                    key={slot}
                                    isSelected={selectedSlot === slot}
                                    setSelected={setSelectedSlot}
                                    deselect={(slot) =>
                                        slot === selectedSlot &&
                                        setSelectedSlot(null)
                                    }
                                    onClick={handleSlotClicked}
                                    slot={slot}
                                    isDisabled={disabledSlots.includes(slot)}
                                />
                            ))}
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
    onClick: (slot: number) => void;
    isDisabled: boolean;
}

function BoardTile(props: BoardTileProps) {
    const { slot, isSelected, setSelected, deselect, onClick, isDisabled } =
        props;
    return (
        <group
            onPointerOver={() => (isDisabled ? null : setSelected(slot))}
            onPointerOut={() => (isDisabled ? null : deselect(slot))}
            onClick={() => (isDisabled ? null : onClick(slot))}
        >
            <mesh position={posForSlot(slot)} scale={[0.8, 1, 0.8]}>
                <meshStandardMaterial color={colourForSlot(slot, isDisabled)} />
                <boxGeometry args={[1, 0.25, 1]} />
            </mesh>

            {/* mouse-over highlighting */}
            <mesh position={posForSlot(slot)}>
                <meshStandardMaterial
                    color={isSelected ? "magenta" : "red"}
                    transparent={true}
                    opacity={isSelected && !isDisabled ? 0.8 : 0}
                />
                <boxGeometry args={[1, 0.2, 1]} />
            </mesh>
        </group>
    );
}

function posForSlot(i: number): [number, number, number] {
    return [(i % 3) - 1, 0, Math.floor(i / 3) - 1];
}

function colourForSlot(i: number, isDisabled: boolean): string {
    if (isDisabled) {
        return i % 2 === 0 ? "gray" : "white";
    }
    return i % 2 === 0 ? "yellow" : "dodgerblue";
}
