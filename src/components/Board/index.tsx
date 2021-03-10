import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { BoardState } from '@utils';
import Text from '../Text';

type BoardProps = {
  state: BoardState;
  disabled?: boolean;
  size: number;
  onCellPressed: (index: number) => void;
};

const Board = ({
  state,
  size,
  onCellPressed,
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
    </View>
  );
};

export default Board;
