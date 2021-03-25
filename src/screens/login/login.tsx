import React, { ReactElement, useRef } from 'react';
import { ScrollView, TextInput as RNTextInput } from 'react-native';

import { GradientBackground, TextInput } from '@components';
import styles from './styles';

const Login = (): ReactElement => {
  const passwordRef = useRef<RNTextInput | null>(null);

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Login Form */}
        <TextInput
          placeholder='Username'
          autoCorrect={false}
          autoCapitalize={'none'}
          autoFocus
          style={{
            marginBottom: 20,
          }}
          returnKeyType='next'
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />
        <TextInput
          ref={passwordRef}
          placeholder='Password'
          secureTextEntry={true}
          returnKeyType='done'
        />
      </ScrollView>
    </GradientBackground>
  );
};

export default Login;
