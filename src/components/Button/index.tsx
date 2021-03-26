import React, { ReactElement } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';

import Text from '../Text';
import styles from './styles';

type ButtonProps = {
  title: string;
  loading: boolean;
} & TouchableOpacityProps;

const defaultProps = {
  loading: false,
};

const Button = ({
  title,
  style,
  loading,
  ...props
}: ButtonProps): ReactElement => {
  return (
    <TouchableOpacity
      disabled={loading}
      style={[styles.button, style]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color='#000' />
      ) : (
        <Text style={styles.text} weight='700'>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

Button.defaultProps = defaultProps;

export default Button;
