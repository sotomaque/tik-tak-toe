import React, { ReactElement, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import { BoardResult } from '@utils';

import styles from './styles';

type BoardLineProps = {
  size: number;
  gameResult?: BoardResult | false;
};

const BoardLine = ({ size, gameResult }: BoardLineProps): ReactElement => {
  const diagonalHeight = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2));
  const animationRef = useRef<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    // animate line
    Animated.timing(animationRef.current, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <>
      {/* Vertical */}
      {gameResult && gameResult.column && gameResult.direction === 'V' && (
        <Animated.View
          style={[
            styles.line,
            styles.vLine,
            {
              left: `${33.333 * gameResult.column - 16.666}%`,
              height: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        ></Animated.View>
      )}
      {/* Horizontal */}
      {gameResult && gameResult.row && gameResult.direction === 'H' && (
        <Animated.View
          style={[
            styles.line,
            styles.hLine,
            {
              top: `${33.333 * gameResult.row - 16.666}%`,
              width: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        ></Animated.View>
      )}
      {/* Diagonal */}
      {gameResult && gameResult.diagonal && gameResult.direction === 'D' && (
        <Animated.View
          style={[
            styles.line,
            styles.dLine,
            {
              height: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, diagonalHeight],
              }),
              transform: [
                // shift up
                {
                  translateY: animationRef.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [size / 2, -(diagonalHeight - size) / 2],
                  }),
                },
                // rotate
                {
                  rotateZ: gameResult.diagonal === 'MAIN' ? '-45deg' : '45deg',
                },
              ],
            },
          ]}
        ></Animated.View>
      )}
    </>
  );
};

export default BoardLine;
