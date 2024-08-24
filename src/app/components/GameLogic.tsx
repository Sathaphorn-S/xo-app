
import { create } from 'zustand';

type GameState = {
  board: string[];
  isXTurn: boolean;
  winner: string | null;
  handleClick: (index: number) => void;
  resetGame: () => void;
};

const useGameLogic = create<GameState>((set) => ({
  board: Array(9).fill(''),
  isXTurn: true,
  winner: null,
  handleClick: (index) => {
    set((state) => {
      if (state.board[index] !== '' || state.winner) return state;

      const newBoard = [...state.board];
      newBoard[index] = state.isXTurn ? 'X' : 'O';
      const newIsXTurn = !state.isXTurn;

      let winner = checkWinner(newBoard);

      if (winner || !newBoard.includes('')) {
        
        if (winner === null && !newBoard.includes('')) {
          winner = 'Draw';
        }
        return { ...state, board: newBoard, winner };
      }

      if (newIsXTurn) {
        return { ...state, board: newBoard, isXTurn: newIsXTurn };
      }

      // AI's turn
      const aiMove = getBestMove(newBoard);
      newBoard[aiMove] = 'O';

      let finalWinner = checkWinner(newBoard);
      if (!newBoard.includes('') && !finalWinner) {
        finalWinner = 'Draw'; // Update winner to 'Draw'
      }

      return { ...state, board: newBoard, isXTurn: true, winner: finalWinner };
    });
  },
  resetGame: () => set({ board: Array(9).fill(''), isXTurn: true, winner: null }),
}));

const checkWinner = (board: string[]): string | null => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

const getBestMove = (board: string[]): number => {
  const emptyIndices = board.map((value, index) => value === '' ? index : -1).filter(index => index !== -1);

  const winningMove = findWinningMove(board, 'O');
  if (winningMove !== -1) return winningMove;

  const blockingMove = findWinningMove(board, 'X');
  if (blockingMove !== -1) return blockingMove;

  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};

const findWinningMove = (board: string[], player: string): number => {
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      const testBoard = [...board];
      testBoard[i] = player;
      if (checkWinner(testBoard) === player) {
        return i;
      }
    }
  }
  return -1;
};

export default useGameLogic;
