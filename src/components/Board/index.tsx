import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { BoardResult, BoardState } from '@utils';
import { BoardLine, Text } from '../index';

import styles from './styles';

type BoardProps = {
  state: BoardState;
  disabled?: boolean;
  size: number;
  gameResult?: BoardResult | false;
  onCellPressed: (index: number) => void;
};

const Board = ({
  state,
  size,
  onCellPressed,
  gameResult,
  disabled,
}: BoardProps): ReactElement => {
  return (
    <View
      style={[
        styles.board,
        {
          width: size,
          height: size,
        },
      ]}
    >
      {state.map((cell, index) => {
        return (
          <TouchableOpacity
            disabled={cell !== null || disabled}
            onPress={() => onCellPressed && onCellPressed(index)}
            key={index}
            style={[styles.cell, styles[`cell${index}` as 'cell']]}
          >
            <Text
              style={[
                styles.cellText,
                {
                  fontSize: size / 7,
                },
              ]}
              weight='700'
            >
              {cell}
            </Text>
          </TouchableOpacity>
        );
      })}
      {gameResult && <BoardLine size={size} gameResult={gameResult} />}
    </View>
  );
};

export default Board;
