import React, { ReactElement, useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Board, GradientBackground } from '@components';
import {
  BoardState,
  printFormattedBoard,
  isTerminal,
  getBestMove,
} from '@utils';
import styles from './styles';

const SinglePlayerGame = (): ReactElement => {
  // prettier-ignore
  const [state, setState] = useState<BoardState>(
    [null, 'x', null,
    'o', null, 'x',
    'o', 'o', 'x']);

  console.log('getBestMove', getBestMove(state, true, 0));

  const handleOnCellPressed = (cell: number): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;

    stateCopy[cell] = 'x';
    setState(stateCopy);
  };

  printFormattedBoard(state);
  console.log(isTerminal(state));
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={!!isTerminal(state)}
          onCellPressed={cell => handleOnCellPressed(cell)}
          state={state}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SinglePlayerGame;
