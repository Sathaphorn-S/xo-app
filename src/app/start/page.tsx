'use client';

import { FC, useState, useEffect } from 'react';
import useGameLogic from '../components/GameLogic';
import ResultDraw from '../components/ResultDraw';
import { useRouter } from 'next/navigation';

const GameBoard: FC = () => {
  const { board, isXTurn, winner, handleClick, resetGame } = useGameLogic();
  const [showOverlay, setShowOverlay] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showButtons, setShowButtons] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('playerName');
    if (name) {
      setPlayerName(name);
    }
  }, []);

  useEffect(() => {
    if (winner === 'Draw') {
      setShowOverlay(true);
      setShowButtons(false);
    } else if (winner) {
      setShowButtons(true);
    }
  }, [winner]);

  useEffect(() => {
    if (!isXTurn && !winner) {
      // Trigger AI move when it's AI's turn
      setTimeout(() => {
        handleClick(getBestMove(board));
      }, 100); // Adding a slight delay for AI move
    }
  }, [isXTurn, winner]);

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setShowButtons(true); // Show buttons after the overlay is closed
  };

  const handleQuit = () => {
    resetGame();
    localStorage.removeItem('playerName');
    router.push('/');
  };

  const getResultMessage = () => {
    if (winner === 'X') {
      return `Winner: ${playerName}`;
    }
    if (winner === 'O') {
      return 'You lose';
    }
    if (winner === 'Draw') {
      return 'It\'s a draw';
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center justify-center h-[853px] bg-gameboard-bg bg-cover bg-center">
      <h1 className="text-4xl font-bold mb-4 text-white shadow-xl">Tic Tac Toe</h1>
      {playerName && (
        <div className="absolute top-12 right-4 text-lg font-semibold text-white shadow-xl">
          Player: {playerName}
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-24 h-24 flex items-center justify-center border-2 border-white text-5xl text-white shadow-xl font-bold bg-black bg-opacity-50 rounded-md"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      {winner && !showOverlay && showButtons && (
        <div className="mt-4 flex space-x-4">
          <p className="text-2xl font-bold">{getResultMessage()}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={resetGame}
          >
            Restart
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleQuit}
          >
            Quit
          </button>
        </div>
      )}
      {winner === 'Draw' && showOverlay && <ResultDraw onClose={handleOverlayClose} />}
    </div>
  );
};

export default GameBoard;

const getBestMove = (board: string[]): number => {
  const emptyIndices = board.map((value, index) => value === '' ? index : -1).filter(index => index !== -1);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)] || 0;
};
