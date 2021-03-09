import { GradientBackground } from '@components';
import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const Game = () => {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text>Game</Text>
      </View>
    </GradientBackground>
  );
};

export default Game;
