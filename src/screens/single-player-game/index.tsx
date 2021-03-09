import React, { ReactElement } from 'react';
import { SafeAreaView } from 'react-native';

import { Board, GradientBackground } from '@components';
import styles from './styles';

const SinglePlayerGame = (): ReactElement => {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          onCellPressed={index => console.warn(index)}
          state={['x', null, 'o', 'x', null, 'o', 'x', null, 'o']}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SinglePlayerGame;
