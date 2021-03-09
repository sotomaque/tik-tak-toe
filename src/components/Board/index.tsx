import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';

import Text from '../Text';

type Cell = 'x' | 'o' | null;

type BoardProps = {
  state: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
  size: number;
  onCellPressed: (index: number) => void;
};

const Board = ({ state, size, onCellPressed }: BoardProps): ReactElement => {
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
