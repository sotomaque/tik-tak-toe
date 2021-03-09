import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Text } from '@components';
import styles from './styles';

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

const Button = ({ title, style, ...props }: ButtonProps): ReactElement => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.text} weight='700'>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
