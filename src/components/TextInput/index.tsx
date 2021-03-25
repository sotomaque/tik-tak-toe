import React, { ReactElement, forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import styles from './styles';

const TextInput = forwardRef<RNTextInput, RNTextInputProps>(
  ({ style, ...props }: RNTextInputProps, ref): ReactElement => (
    <RNTextInput
      ref={ref}
      placeholderTextColor='#5d5379'
      style={[styles.textInput, style]}
      {...props}
    />
  )
);

TextInput.displayName = 'TextInput';

export default TextInput;
