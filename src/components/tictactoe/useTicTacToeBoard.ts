import * as React from 'react';

export type Player = 'X' | 'O';
/** The state of any one position on the board.  "" means no mark has been played there, yet. */
export type PosState = Player | '';
/** The index of any board position */
export type PosIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
/** The state of a 3x3 tic-tac-toe board.
 *
 * Positions are listed as in left-to-right reading order
 * (left to right, top to bottom).
 */
export type BoardState = [
    PosState,
    PosState,
    PosState,
    PosState,
    PosState,
    PosState,
    PosState,
    PosState,
    PosState
];

export type WinState =
    | { state: 'draw' }
    | { state: 'not finished' }
    | { state: 'won'; winner: Player };


/** Returns a tictactoe BoardState ready to be rendered, as well as a function that can be called to update the game board with a move.
 *
 *
 * When a move is made, the containing React component will be re-rendered, and useGameBoard (when called again) will return an updated board.
 *
 *
 * Illegal moves are ignored, the board-state will be unchanged, and no re-render will be caused.
 *
 * @returns [current BoardState, applyMove function, resetBoard function]
 */
export function useTicTacToeBoard(): [
    BoardState,
    (posIndex: PosIndex) => void,
    () => void
] {
    const initialBoard: BoardState = makeInitialBoard();

    return useTicTacToeBoardWithInitial(initialBoard);
}

function makeInitialBoard(): BoardState {
    return ['', '', '', '', '', '', '', '', ''];
}

export function useTicTacToeBoardWithInitial(
    initialBoard: BoardState
): [BoardState, (posIndex: PosIndex) => void, () => void] {
    const [gameBoard, setGameBoard] = React.useState(initialBoard);

    function applyMove(posIndex: PosIndex): void {
        const currVal = gameBoard[posIndex];
        if (currVal !== '') {
            console.log("can't apply move at taken space: " + posIndex);
            return;
        }
        const newBoard: BoardState = [...gameBoard];
        newBoard[posIndex] = whoseTurnIsIt();
        setGameBoard(newBoard);
    }

    function whoseTurnIsIt(): Player {
        const countX = gameBoard.filter((p) => p === 'X').length;
        const countO = gameBoard.filter((p) => p === 'O').length;
        return countX <= countO ? 'X' : 'O';
    }
    function reset() {
        setGameBoard(makeInitialBoard());
    }
    return [gameBoard, applyMove, reset];
}
/** Same behaviour as useTicTacToeBoard but with a made-up game-in-progress, to help early UI prototyping. */
export function useExampleTicTacToeBoard(): [
    BoardState,
    (posIndex: PosIndex) => void,
    () => void
] {
    const exampleBoard: BoardState = ['X', 'O', '', 'X', '', 'O', 'X', '', ''];

    return useTicTacToeBoardWithInitial(exampleBoard);
}

export function calcWinState(board: BoardState): WinState {
    const firstWinningLine: [PosIndex, PosIndex, PosIndex] | undefined =
        findWinningLine(board);

    if (firstWinningLine) {
        const [ix1, ix2, ix3] = firstWinningLine;
        const player = board[ix1] as Player; //TS doesn't know this is not ""
        return { state: 'won', winner: player };
    }

    if (boardIsFull(board)) {
        return { state: 'draw' };
    }

    return { state: 'not finished' };
}

function findWinningLine(
    board: BoardState
): [PosIndex, PosIndex, PosIndex] | undefined {
    function lineIsWin([ixA, ixB, ixC]: [PosIndex, PosIndex, PosIndex]): boolean {
        return board[ixA] !== '' && areAllEqual(board[ixA], board[ixB], board[ixC]);
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
    return allLines.find(lineIsWin);
}

function boardIsFull(board: BoardState): boolean {
    return board.filter((posState) => posState === '').length === 0;
}

function areAllEqual<T>(a: T, b: T, c: T): boolean {
    return a === b && a === c;
}
