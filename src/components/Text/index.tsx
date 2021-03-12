import React, { ReactNode, ReactElement } from 'react';
import { Text as NativeText, TextProps as NativeTextProps } from 'react-native';

type TextProps = {
  weight?: '400' | '700';
  children: string | ReactNode;
} & NativeTextProps;

const defaultProps = {
  weight: '700',
};

const Text = ({
  children,
  style,
  weight,
  ...props
}: TextProps): ReactElement => {
  let fontFamily;
  if (weight === '400') {
    fontFamily = 'DeliusUnicase_400Regular';
  } else {
    fontFamily = 'DeliusUnicase_700Bold';
  }

  return (
    <NativeText style={[{ fontFamily }, style]} {...props}>
      {children}
    </NativeText>
  );
};

Text.defaultProps = defaultProps;

export default Text;
