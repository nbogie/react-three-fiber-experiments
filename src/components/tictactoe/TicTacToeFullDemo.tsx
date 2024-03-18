import { Center, Float, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
    EffectComposer,
    Select,
    Selection,
    SelectiveBloom,
} from "@react-three/postprocessing";
import { useState } from "react";
import {
    Player,
    PosIndex,
    PosState,
    useTicTacToeBoard,
    WinState,
} from "./useTicTacToeBoard";

//Generate font json with https://gero3.github.io/facetype.js/
//Only these characters: 'aAdDeEiInNrRwW!xXoO :'
const fontURL = "/Arvo_Bold.json";
export function TicTacToeFullDemo() {
    const slots: PosIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const [gameBoard, setPosOnGameBoard, resetGameBoard, winState] =
        useTicTacToeBoard();
    const [selectedSlot, setSelectedSlot] = useState<null | PosIndex>(null);
    const isGameOver = winState.state !== "not finished";

    function handleResetGame() {
        resetGameBoard();
    }

    function handleSlotClicked(slot: number) {
        setPosOnGameBoard(slot as PosIndex);
        setSelectedSlot(null);
    }
    function isInWinningLines(slot: number): boolean {
        if (winState.state !== "won") {
            return false;
        }
        return winState.winningLines.some(
            (line) => line.find((winSlot) => winSlot === slot) !== undefined
        );
    }

    return (
        <div className="demo-container-with-side">
            <div>
                <button onClick={handleResetGame}>Reset Game</button>
            </div>

            <div className="canvas-container">
                <Canvas camera={{ position: [0.1, 2, 3] }}>
                    <OrbitControls autoRotate={isGameOver} />
                    <ambientLight />
                    <directionalLight position={[3, 3, -1]} />
                    <directionalLight color={"gray"} position={[1, -1, 2]} />

                    <Selection enabled>
                        <EffectComposer>
                            <SelectiveBloom
                                luminanceThreshold={0}
                                luminanceSmoothing={0.9}
                                height={300}
                            />
                        </EffectComposer>

                        {isGameOver && <GameOutcomeText winState={winState} />}
                        {isGameOver && (
                            <RestartText onClick={handleResetGame} />
                        )}
                        {/* <Stage> */}
                        <group>
                            {slots.map((slot) => (
                                <BoardTile
                                    key={slot}
                                    content={gameBoard[slot]}
                                    isSelected={selectedSlot === slot}
                                    setSelected={setSelectedSlot}
                                    deselect={(slot) =>
                                        slot === selectedSlot &&
                                        setSelectedSlot(null)
                                    }
                                    onClick={handleSlotClicked}
                                    slot={slot}
                                    isDisabled={
                                        isGameOver || gameBoard[slot] !== ""
                                    }
                                    isHighlitForWin={isInWinningLines(slot)}
                                />
                            ))}
                        </group>
                    </Selection>
                    {/* </Stage> */}
                </Canvas>
            </div>
        </div>
    );
}

interface BoardTileProps {
    /** index of the tile */
    slot: PosIndex;
    /** the content "X" | "O" | "" in the slot */
    content: PosState;
    /** is selected (likely mouse over, ready to be clicked) */
    isSelected: boolean;
    /** function to be called when tile is hovered over */
    setSelected: (slot: PosIndex) => void;
    /** function to be called when tile ceases to be hovered over */
    deselect: (slot: number) => void;

    /** function to be called when tile is clicked */
    onClick: (slot: number) => void;
    /** function is disabled - can't be clicked (e.g. has already been played on) */
    isDisabled: boolean;
    /** is to be highlit as part of a winning row */
    isHighlitForWin: boolean;
}

function BoardTile(props: BoardTileProps) {
    const {
        slot,
        isSelected,
        setSelected,
        deselect,
        onClick,
        isDisabled,
        isHighlitForWin,
        content,
    } = props;
    return (
        <group
            onPointerOver={() => (isDisabled ? null : setSelected(slot))}
            onPointerOut={() => (isDisabled ? null : deselect(slot))}
            onClick={() => (isDisabled ? null : onClick(slot))}
        >
            <Float speed={isHighlitForWin ? 5 : 0}>
                <group position={posForSlot(slot)}>
                    <Center position={[0, 0.16, 0]}>
                        <Text3D
                            font={fontURL}
                            scale={0.6}
                            rotation-x={-Math.PI / 2}
                        >
                            {content}
                            <meshStandardMaterial
                                color={content === "X" ? "#dddddd" : "tomato"}
                            />
                        </Text3D>
                    </Center>
                    {/* clickable board position */}
                    <mesh scale={[0.8, 1, 0.8]}>
                        <meshStandardMaterial
                            color={colourForSlot(slot, isDisabled)}
                        />
                        <boxGeometry args={[1, 0.25, 1]} />
                    </mesh>

                    {/* mouse-over highlighting */}
                    {/* for selective bloom */}
                    <Select enabled={isSelected || isHighlitForWin}>
                        <mesh>
                            <boxGeometry args={[1, 0.2, 1]} />
                            <meshStandardMaterial
                                emissive={"magenta"}
                                emissiveIntensity={3}
                                color={isSelected ? "magenta" : "red"}
                                transparent={true}
                                opacity={isSelected && !isDisabled ? 0.5 : 0}
                            />
                        </mesh>
                    </Select>
                </group>
            </Float>
        </group>
    );
}

interface GameOutcomeTextProps {
    winState: WinState;
}

function GameOutcomeText({ winState }: GameOutcomeTextProps) {
    const colour =
        winState.state === "won" ? colourForPlayer(winState.winner) : "gray";
    return (
        <Float position={[0, 1.5, 0]} speed={1}>
            <Center>
                {/* for selective bloom */}
                <Select enabled>
                    <Text3D font={fontURL} scale={0.5}>
                        {winState.state === "won"
                            ? `Winner: ${winState.winner}!`
                            : "Draw"}
                        <meshStandardMaterial color={colour} />
                    </Text3D>
                </Select>
            </Center>
        </Float>
    );
}
interface RestartTextProps {
    onClick: () => void;
}
function RestartText({ onClick }: RestartTextProps) {
    return (
        <Float position={[0, -0.8, 1]} speed={8} onClick={onClick}>
            <Center>
                <Text3D font={fontURL} scale={0.4}>
                    Restart
                    <meshStandardMaterial color="gray" />
                </Text3D>
            </Center>
        </Float>
    );
}

function posForSlot(i: PosIndex): [number, number, number] {
    return [(i % 3) - 1, 0, Math.floor(i / 3) - 1];
}

function colourForSlot(i: PosIndex, isDisabled: boolean): string {
    if (isDisabled) {
        return i % 2 === 0 ? "gray" : "gray";
    }
    return i % 2 === 0 ? "yellow" : "dodgerblue";
}
function colourForPlayer(p: Player): string {
    return p === "X" ? "#dddddd" : "tomato";
}
