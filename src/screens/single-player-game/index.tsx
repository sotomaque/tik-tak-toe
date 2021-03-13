import React, { ReactElement, useState, useEffect } from 'react';
import { SafeAreaView, Dimensions, View } from 'react-native';

import { Board, Button, GradientBackground, Text } from '@components';
import {
  BoardState,
  isTerminal,
  getBestMove,
  isBoardEmpty,
  Cell,
} from '@utils';
import { useSounds } from '@hooks';
import { useSettings, difficulties } from '@context/settings-context';
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const SinglePlayerGame = (): ReactElement => {
  const { settings } = useSettings();
  // prettier-ignore
  const [state, setState] = useState<BoardState>(
    [null, null, null,
    null, null, null,
    null, null, null]);
  const [turn, setTurn] = useState<'HUMAN' | 'BOT'>(
    Math.random() < 0.5 ? 'HUMAN' : 'BOT'
  );
  const [isHumanMaximizing, setisHumanMaximizing] = useState<boolean>(true);
  const [gamesCount, setGamesCount] = useState({
    wins: 0,
    losses: 0,
    ties: 0,
  });
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
        setGamesCount({
          ...gamesCount,
          wins: gamesCount.wins + 1,
        });
      } else if (winner === 'BOT') {
        playSound('loss');
        setGamesCount({
          ...gamesCount,
          losses: gamesCount.losses + 1,
        });
      } else {
        playSound('draw');
        setGamesCount({
          ...gamesCount,
          ties: gamesCount.ties + 1,
        });
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
          const bestPossibleMove = getBestMove(
            state,
            !isHumanMaximizing,
            0,
            settings ? parseInt(settings?.difficulty) : -1
          ); // -1 maxDepth => hardest difficulty
          insertCell(bestPossibleMove, isHumanMaximizing ? 'o' : 'x');
          setTurn('HUMAN');
        }
      }
    }
  }, [state, turn]);

  const startNewGame = () => {
    // clear board
    setState([null, null, null, null, null, null, null, null, null]);
    // set turn to random player
    setTurn(Math.random() < 0.5 ? 'HUMAN' : 'BOT');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.difficultyText} weight='700'>
            Difficulty:{' '}
            {settings ? difficulties[settings.difficulty] : 'Beginner'}
          </Text>
          <View style={styles.results}>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle} weight='700'>
                Wins
              </Text>
              <Text style={styles.resultsCount} weight='700'>
                {gamesCount.wins}
              </Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle} weight='700'>
                Draws
              </Text>
              <Text style={styles.resultsCount} weight='700'>
                {gamesCount.ties}
              </Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle} weight='700'>
                Losses
              </Text>
              <Text style={styles.resultsCount} weight='700'>
                {gamesCount.losses}
              </Text>
            </View>
          </View>
        </View>
        <Board
          disabled={!!isTerminal(state) || turn !== 'HUMAN'}
          onCellPressed={cell => handleOnCellPressed(cell)}
          state={state}
          size={SCREEN_WIDTH - 60}
          gameResult={gameResult}
        />
        {gameResult && (
          <View style={styles.modal}>
            <Text style={styles.modalText} weight='700'>
              {getWinner(gameResult.winner) === 'HUMAN' && 'You Won!'}
              {getWinner(gameResult.winner) === 'BOT' && 'You Lost'}
              {getWinner(gameResult.winner) === 'DRAW' && `It's a Draw!`}
            </Text>
            <Button title='Play Again' onPress={startNewGame} />
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SinglePlayerGame;
