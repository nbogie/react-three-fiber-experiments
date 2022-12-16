import * as React from 'react';
import { calcWinState } from './calcWinState';

export type Player = 'X' | 'O';
/** The state of any one position on the board.  "" means no mark has been played there, yet. */
export type PosState = Player | '';
/** The index of any board position */
export type PosIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type WinningLine = [PosIndex, PosIndex, PosIndex];

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
    | { state: 'won'; winner: Player, winningLines: WinningLine[] };

export type UseBoardReturn = [BoardState, (posIndex: PosIndex) => void, () => void, WinState];


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
export function useTicTacToeBoard(): UseBoardReturn {
    const initialBoard: BoardState = makeInitialBoard();

    return useTicTacToeBoardWithInitial(initialBoard);
}

function makeInitialBoard(): BoardState {
    return ['', '', '', '', '', '', '', '', ''];
}

export function useTicTacToeBoardWithInitial(
    initialBoard: BoardState
): UseBoardReturn {
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
    const winState = calcWinState(gameBoard)
    return [gameBoard, applyMove, reset, winState];
}
/** Same behaviour as useTicTacToeBoard but with a made-up game-in-progress, to help early UI prototyping. */
export function useExampleTicTacToeBoard():
    UseBoardReturn {
    const exampleBoard: BoardState = ['X', 'O', '', 'X', '', 'O', 'X', '', ''];

    return useTicTacToeBoardWithInitial(exampleBoard);
}


