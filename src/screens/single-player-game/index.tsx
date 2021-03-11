import React, { ReactElement, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { Board, GradientBackground } from '@components';
import {
  BoardState,
  isTerminal,
  getBestMove,
  isBoardEmpty,
  Cell,
} from '@utils';
import { useSounds } from '@hooks';
import styles from './styles';

const SinglePlayerGame = (): ReactElement => {
  // prettier-ignore
  const [state, setState] = useState<BoardState>(
    [null, null, null,
    null, null, null,
    null, null, null]);
  const [turn, setTurn] = useState<'HUMAN' | 'BOT'>(
    Math.random() < 0.5 ? 'HUMAN' : 'BOT'
  );
  const [isHumanMaximizing, setisHumanMaximizing] = useState<boolean>(true);
  const playSound = useSounds();
  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: 'x' | 'o'): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;

    stateCopy[cell] = symbol;
    setState(stateCopy);
    // play sound + haptics
    symbol === 'x' ? playSound('pop1') : playSound('pop2');
  };

  const handleOnCellPressed = (cell: number): void => {
    if (turn !== 'HUMAN') return;
    insertCell(cell, isHumanMaximizing ? 'x' : 'o');
    setTurn('BOT');
  };

  const getWinner = (winnerSymbol: Cell): 'HUMAN' | 'BOT' | 'DRAW' => {
    if (winnerSymbol === 'x') {
      return isHumanMaximizing ? 'HUMAN' : 'BOT';
    } else if (winnerSymbol === 'o') {
      return isHumanMaximizing ? 'BOT' : 'HUMAN';
    } else return 'DRAW';
  };

  useEffect(() => {
    if (gameResult) {
      // TODO: handle game ended
      const winner = getWinner(gameResult.winner);
      if (winner === 'HUMAN') {
        playSound('win');
        alert('You Won!');
      } else if (winner === 'BOT') {
        playSound('loss');
        alert('You Loss');
      } else {
        playSound('draw');
        alert(`It's a Draw!`);
      }
    } else {
      if (turn === 'BOT') {
        if (isBoardEmpty(state)) {
          // play 'random' move (random good move)
          const centerAndCorners = [0, 2, 6, 8, 4];
          const randomFirstMove =
            centerAndCorners[
              Math.floor(Math.random() * centerAndCorners.length)
            ];
          insertCell(randomFirstMove, 'x');
          setisHumanMaximizing(false); // since computer went first and first mover gets assigned x
          setTurn('HUMAN');
        } else {
          const bestPossibleMove = getBestMove(state, !isHumanMaximizing, 0, 1); // -1 maxDepth => hardest difficulty
          insertCell(bestPossibleMove, isHumanMaximizing ? 'o' : 'x');
          setTurn('HUMAN');
        }
      }
    }
  }, [state, turn]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={!!isTerminal(state) || turn !== 'HUMAN'}
          onCellPressed={cell => handleOnCellPressed(cell)}
          state={state}
          size={300}
          gameResult={gameResult}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SinglePlayerGame;
