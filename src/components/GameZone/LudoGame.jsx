import React, { useState } from 'react';

const LudoGame = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [turn, setTurn] = useState('P1');
  const [p1Pos, setP1Pos] = useState(0);
  const [p2Pos, setP2Pos] = useState(0);
  const [winner, setWinner] = useState(null);

  const MAX_POS = 15;

  const rollDice = () => {
    if (isRolling || winner) return;
    setIsRolling(true);

    let rolls = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      if (rolls >= 8) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalVal);
        setIsRolling(false);
        movePlayer(finalVal);
      }
    }, 80);
  };

  const movePlayer = (steps) => {
    if (turn === 'P1') {
      const nextPos = Math.min(p1Pos + steps, MAX_POS);
      setP1Pos(nextPos);
      if (nextPos === MAX_POS) {
        setWinner('Player 1 (Union Red)');
      } else {
        setTurn('P2');
      }
    } else {
      const nextPos = Math.min(p2Pos + steps, MAX_POS);
      setP2Pos(nextPos);
      if (nextPos === MAX_POS) {
        setWinner('Player 2 (Royal Blue)');
      } else {
        setTurn('P1');
      }
    }
  };

  const resetGame = () => {
    setP1Pos(0);
    setP2Pos(0);
    setTurn('P1');
    setWinner(null);
    setDiceValue(1);
  };

  return (
    <div class="game-card theme-uk">
      <div class="game-header">
        <div class="game-title">
          <span class="flag-icon">🇬🇧</span> UK Union Jack Ludo (2P)
        </div>
        <div class="game-stats">
          <span>Turn: <b style={{ color: turn === 'P1' ? '#CF142B' : '#4D82FF' }}>{turn === 'P1' ? 'P1 (Red)' : 'P2 (Blue)'}</b></span>
        </div>
      </div>

      <div class="game-board ludo-container">
        <div class="ludo-placeholder board-uk" style={{ height: 'auto', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#CF142B', fontWeight: 'bold' }}>P1 Union Red</div>
              <div style={{ fontSize: '20px', marginTop: '5px' }}>{p1Pos} / {MAX_POS}</div>
            </div>
            <div style={{ fontSize: '24px', color: 'rgba(255,255,255,0.4)' }}>VS</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#4D82FF', fontWeight: 'bold' }}>P2 Royal Blue</div>
              <div style={{ fontSize: '20px', marginTop: '5px' }}>{p2Pos} / {MAX_POS}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '15px' }}>
            {Array.from({ length: MAX_POS + 1 }).map((_, idx) => {
              const isP1 = p1Pos === idx;
              const isP2 = p2Pos === idx;
              return (
                <div
                  key={idx}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: isP1 && isP2 ? '#FFFFFF' : isP1 ? '#CF142B' : isP2 ? '#00247D' : 'rgba(255,255,255,0.15)',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    boxShadow: isP1 || isP2 ? '0 0 10px rgba(255,255,255,0.8)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              );
            })}
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              class="game-btn btn-uk"
              onClick={rollDice}
              disabled={isRolling || !!winner}
              style={{
                fontSize: '18px',
                padding: '10px 24px',
                transform: isRolling ? 'scale(1.1) rotate(15deg)' : 'scale(1)'
              }}
            >
              🎲 {isRolling ? 'Rolling...' : `Roll (${diceValue})`}
            </button>
          </div>
        </div>

        {winner && (
          <div class="game-overlay">
            <h3 style={{ color: '#CF142B' }}>🎉 {winner} Wins!</h3>
            <button class="game-btn btn-uk" onClick={resetGame}>
              🔄 Play Again
            </button>
          </div>
        )}
      </div>

      <div class="game-controls">
        <button class="game-btn btn-uk" onClick={resetGame}>
          🔄 Reset Match
        </button>
      </div>
    </div>
  );
};

export default LudoGame;
