import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { BoardResult, BoardState } from '@utils';
import { BoardLine, Text } from '../index';

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
      style={{
        width: size,
        height: size,
        backgroundColor: 'green',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {state.map((cell, index) => {
        return (
          <TouchableOpacity
            disabled={cell !== null || disabled}
            onPress={() => onCellPressed && onCellPressed(index)}
            key={index}
            style={{
              width: '33.333%',
              height: '33.333%',
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: size / 8,
              }}
              weight='700'
            >
              {cell}
            </Text>
          </TouchableOpacity>
        );
      })}
      {true && (
        <BoardLine
          size={size}
          gameResult={{ winner: 'o', diagonal: 'MAIN', direction: 'D' }}
        />
      )}
    </View>
  );
};

export default Board;
