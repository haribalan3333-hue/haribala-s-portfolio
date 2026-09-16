import React, { useState, useEffect, useRef } from 'react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('snake_highscore') || '0', 10));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const GRID_SIZE = 15;
  const CANVAS_SIZE = 300;
  const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

  const gameState = useRef({
    snake: [{ x: 7, y: 7 }],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 3, y: 3 }
  });

  const generateFood = (snake) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  };

  const resetGame = () => {
    const initialSnake = [{ x: 7, y: 7 }, { x: 6, y: 7 }];
    gameState.current = {
      snake: initialSnake,
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      food: generateFood(initialSnake)
    };
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || isPaused) return;
      const { direction } = gameState.current;
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W':
          if (direction.y === 0) gameState.current.nextDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown': case 's': case 'S':
          if (direction.y === 0) gameState.current.nextDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft': case 'a': case 'A':
          if (direction.x === 0) gameState.current.nextDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight': case 'd': case 'D':
          if (direction.x === 0) gameState.current.nextDirection = { x: 1, y: 0 };
          break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isPaused]);

  useEffect(() => {
    if (!isPlaying || isPaused || gameOver) return;

    const interval = setInterval(() => {
      const { snake, nextDirection, food } = gameState.current;
      gameState.current.direction = nextDirection;

      const head = {
        x: snake[0].x + nextDirection.x,
        y: snake[0].y + nextDirection.y
      };

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE ||
          snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }

      const newSnake = [head, ...snake];

      if (head.x === food.x && head.y === food.y) {
        const newScore = score + 10;
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('snake_highscore', newScore.toString());
        }
        gameState.current.food = generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      gameState.current.snake = newSnake;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        // Sri Lankan Flag Maroon background for canvas
        ctx.fillStyle = '#4A0B1E';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Subtle grid lines with Gold accent
        ctx.strokeStyle = 'rgba(255, 190, 41, 0.08)';
        for (let i = 0; i <= GRID_SIZE; i++) {
          ctx.beginPath();
          ctx.moveTo(i * CELL_SIZE, 0); ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE); ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, i * CELL_SIZE); ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE); ctx.stroke();
        }

        // Draw Sri Lanka Emerald Green glowing food
        ctx.fillStyle = '#00E676';
        ctx.shadowColor = '#00E676';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(
          food.x * CELL_SIZE + CELL_SIZE / 2,
          food.y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE / 2 - 2,
          0, Math.PI * 2
        );
        ctx.fill();

        // Draw Snake (Head = Sri Lanka Lion Gold #FFBE29, Body = Vibrant Orange #EB7400)
        newSnake.forEach((segment, index) => {
          ctx.fillStyle = index === 0 ? '#FFBE29' : '#EB7400';
          ctx.shadowColor = index === 0 ? '#FFBE29' : '#EB7400';
          ctx.shadowBlur = index === 0 ? 10 : 4;
          ctx.fillRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
          );
        });
        ctx.shadowBlur = 0;
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, gameOver, score, highScore]);

  const touchStartRef = useRef(null);
  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || !isPlaying || isPaused) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const { direction } = gameState.current;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 20 && direction.x === 0) gameState.current.nextDirection = { x: 1, y: 0 };
      else if (deltaX < -20 && direction.x === 0) gameState.current.nextDirection = { x: -1, y: 0 };
    } else {
      if (deltaY > 20 && direction.y === 0) gameState.current.nextDirection = { x: 0, y: 1 };
      else if (deltaY < -20 && direction.y === 0) gameState.current.nextDirection = { x: 0, y: -1 };
    }
  };

  return (
    <div class="game-card theme-srilanka">
      <div class="game-header">
        <div class="game-title">
          <span class="flag-icon">🇱🇰</span> Sri Lanka Cyber Snake
        </div>
        <div class="game-stats">
          <span>Score: <b style={{ color: '#FFBE29' }}>{score}</b></span>
          <span>Best: <b style={{ color: '#FFBE29' }}>{highScore}</b></span>
        </div>
      </div>

      <div
        class="game-board snake-canvas-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} class="snake-canvas" />

        {(!isPlaying || gameOver) && (
          <div class="game-overlay">
            <h3 style={{ color: '#FFBE29' }}>{gameOver ? 'Game Over!' : 'Sri Lankan Cyber Snake'}</h3>
            <button class="game-btn btn-lk" onClick={resetGame}>
              {gameOver ? '🔄 Try Again' : '▶️ Start Game'}
            </button>
          </div>
        )}
      </div>

      <div class="game-controls">
        {isPlaying && !gameOver && (
          <button class="game-btn btn-lk" onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
        )}
        <button class="game-btn btn-lk" onClick={resetGame}>
          🔄 Restart
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;
