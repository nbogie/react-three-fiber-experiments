import {
    BoardState,
    WinState,
    WinningLine,
    Player,
    PosIndex,
} from "./useTicTacToeBoard";

export function calcWinState(board: BoardState): WinState {
    const winningLines: WinningLine[] = findWinningLines(board);
    const [firstWinningLine] = winningLines;

    if (firstWinningLine) {
        const [ix1, ix2, ix3] = firstWinningLine;
        const player = board[ix1] as Player; //TS doesn't know this is not ""
        return { state: "won", winner: player, winningLines };
    }

    if (boardIsFull(board)) {
        return { state: "draw" };
    }

    return { state: "not finished" };
}
function findWinningLines(board: BoardState): [PosIndex, PosIndex, PosIndex][] {
    function lineIsWin([ixA, ixB, ixC]: [
        PosIndex,
        PosIndex,
        PosIndex,
    ]): boolean {
        return (
            board[ixA] !== "" && areAllEqual(board[ixA], board[ixB], board[ixC])
        );
    }

    const allLines: [PosIndex, PosIndex, PosIndex][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return allLines.filter(lineIsWin);
}
function boardIsFull(board: BoardState): boolean {
    return board.filter((posState) => posState === "").length === 0;
}
function areAllEqual<T>(a: T, b: T, c: T): boolean {
    return a === b && a === c;
}
