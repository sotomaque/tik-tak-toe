import React, { ReactElement } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import styles from './styles';

type TextInputProps = {
  placeholder: string;
  placeholderTextColor?: string;
  customStyles?: { [key: string]: string };
};

const defaultProps = {
  placeholderTextColor: '#5d5379',
};

const TextInput = ({
  placeholder,
  placeholderTextColor,
  customStyles,
}: TextInputProps): ReactElement => {
  return (
    <RNTextInput
      style={[styles.textInput, customStyles]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
