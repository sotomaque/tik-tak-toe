import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

import { Board, GradientBackground } from '@components';
import { BoardState, isTerminal, getBestMove, isBoardEmpty } from '@utils';
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
  const gameResult = isTerminal(state);
  const popSoundRef = useRef<Audio.Sound | null>(null);
  const pop2SoundRef = useRef<Audio.Sound | null>(null);

  const insertCell = (cell: number, symbol: 'x' | 'o'): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;

    stateCopy[cell] = symbol;
    setState(stateCopy);
    // play sound + haptics
    try {
      symbol === 'x'
        ? popSoundRef.current?.replayAsync()
        : pop2SoundRef.current?.replayAsync();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.error('error playing sound', error);
    }
  };

  const handleOnCellPressed = (cell: number): void => {
    if (turn !== 'HUMAN') return;
    insertCell(cell, isHumanMaximizing ? 'x' : 'o');
    setTurn('BOT');
  };

  useEffect(() => {
    if (gameResult) {
      // TODO: handle game ended
      alert('GAME OVER');
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
          const bestPossibleMove = getBestMove(
            state,
            !isHumanMaximizing,
            0,
            -1
          ); // -1 maxDepth => hardest difficulty
          insertCell(bestPossibleMove, isHumanMaximizing ? 'o' : 'x');
          setTurn('HUMAN');
        }
      }
    }
  }, [state, turn]);

  useEffect(() => {
    // load sounds on mount
    const popSoundObj = new Audio.Sound();
    const pop2SoundObj = new Audio.Sound();

    const loadSounds = async () => {
      // sound 1
      await popSoundObj.loadAsync(require('@assets/pop_1.wav'));
      popSoundRef.current = popSoundObj;
      await pop2SoundObj.loadAsync(require('@assets/pop_2.wav'));
      pop2SoundRef.current = pop2SoundObj;
    };

    loadSounds();

    return () => {
      // un-load sounds on unmount
      popSoundObj && popSoundObj.unloadAsync();
      pop2SoundObj && pop2SoundObj.unloadAsync();
    };
  }, []);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={!!isTerminal(state) || turn !== 'HUMAN'}
          onCellPressed={cell => handleOnCellPressed(cell)}
          state={state}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SinglePlayerGame;
