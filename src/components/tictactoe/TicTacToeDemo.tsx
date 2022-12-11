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

    return (
        <div className="demo-container-with-side">
            <div>
                side pane
            </div>

            <div className="canvas-container">
                <Canvas>
                    <OrbitControls autoRotate={false} />
                    <Stage>
                        <group >
                            {slots.map(slot => <BoardTile slot={slot} />)}
                        </group>
                    </Stage>
                </Canvas>
            </div>
        </div>
    );
}

interface BoardTileProps {
    slot: number;
}

function BoardTile(props: BoardTileProps) {
    const { slot } = props;
    return (
        <mesh position={posForSlot(slot)} >
            <meshStandardMaterial color={colourForSlot(slot)} />
            <boxGeometry args={[1, 0.25, 1]} />
        </mesh>

    )
}