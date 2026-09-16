import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState('AI_HARD');
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });
  const [winningLine, setWinningLine] = useState(null);
  const [winnerName, setWinnerName] = useState('');
  const [status, setStatus] = useState('playing'); // 'playing', 'won', 'draw'

  const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (currentBoard) => {
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], combo };
      }
    }
    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'DRAW', combo: null };
    }
    return null;
  };

  const minimax = (tempBoard, depth, isMaximizing) => {
    const result = checkWinner(tempBoard);
    if (result) {
      if (result.winner === 'O') return 10 - depth;
      if (result.winner === 'X') return depth - 10;
      if (result.winner === 'DRAW') return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (tempBoard[i] === null) {
          tempBoard[i] = 'O';
          let score = minimax(tempBoard, depth + 1, false);
          tempBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (tempBoard[i] === null) {
          tempBoard[i] = 'X';
          let score = minimax(tempBoard, depth + 1, true);
          tempBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestAIMove = (currentBoard, currentMode) => {
    const emptyIndices = currentBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    if (emptyIndices.length === 0) return undefined;

    if (currentMode === 'AI_EASY') {
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    if (currentMode === 'AI_MEDIUM') {
      if (Math.random() > 0.5) {
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }
    }

    let bestScore = -Infinity;
    let move = emptyIndices[0];
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const handleClick = (index) => {
    // Block clicks if square taken, game over, or AI is currently thinking
    if (board[index] || status !== 'playing') return;
    if (mode.startsWith('AI') && !isXNext) return;

    const currentPlayer = isXNext ? 'X' : 'O';
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const res = checkWinner(newBoard);
    if (res) {
      handleEndGame(res);
      return;
    }

    setIsXNext(!isXNext);
  };

  useEffect(() => {
    if (!isXNext && status === 'playing' && mode.startsWith('AI')) {
      const timer = setTimeout(() => {
        const aiMove = getBestAIMove([...board], mode);
        if (aiMove !== undefined) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);

          const res = checkWinner(newBoard);
          if (res) {
            handleEndGame(res);
          } else {
            setIsXNext(true);
          }
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, status, mode]);

  const handleEndGame = (res) => {
    if (res.winner === 'DRAW') {
      setStatus('draw');
      setWinnerName('DRAW');
      setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
    } else {
      setStatus('won');
      setWinnerName(res.winner);
      setWinningLine(res.combo);
      setScores(prev => ({ ...prev, [res.winner]: prev[res.winner] + 1 }));
    }
  };

  const resetMatch = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
    setWinnerName('');
    setStatus('playing');
  };

  return (
    <div class="game-card theme-india">
      <div class="game-header">
        <div class="game-title">
          <span class="flag-icon">🇮🇳</span> Indian Flag XO
        </div>
        <select
          value={mode}
          onChange={(e) => { setMode(e.target.value); resetMatch(); }}
          class="select-in"
        >
          <option value="PVP">👥 2 Player (Offline)</option>
          <option value="AI_EASY">🤖 AI (Easy)</option>
          <option value="AI_MEDIUM">🤖 AI (Medium)</option>
          <option value="AI_HARD">🤖 AI (Unbeatable Minimax)</option>
        </select>
      </div>

      <div class="game-stats" style={{ justifyContent: 'center', marginBottom: '15px' }}>
        <span>X (Saffron): <b style={{ color: '#FF9933' }}>{scores.X}</b></span>
        <span>O (Green): <b style={{ color: '#138808' }}>{scores.O}</b></span>
        <span>Draws: <b>{scores.Draws}</b></span>
      </div>

      <div class="game-board" style={{ padding: '15px' }}>
        <div class="tictactoe-board board-india">
          {board.map((cell, idx) => {
            const isWinCell = winningLine && winningLine.includes(idx);
            return (
              <button
                key={idx}
                class={`tictactoe-cell cell-in ${cell ? (cell === 'X' ? 'x-in' : 'o-in') : ''} ${isWinCell ? 'win-in' : ''}`}
                onClick={() => handleClick(idx)}
                disabled={status !== 'playing' || !!cell}
              >
                {cell}
              </button>
            );
          })}
        </div>

        {status !== 'playing' && (
          <div class="game-overlay">
            <h3 style={{ color: '#FF9933' }}>
              {status === 'draw' ? '🤝 Match Draw!' : `🎉 Player ${winnerName} Won!`}
            </h3>
            <button class="game-btn btn-in" onClick={resetMatch}>
              🔄 Play Again
            </button>
          </div>
        )}
      </div>

      <div class="game-controls">
        <button class="game-btn btn-in" onClick={resetMatch}>
          🔄 Reset Match
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
