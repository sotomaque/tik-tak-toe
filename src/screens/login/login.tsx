import React, { ReactElement } from 'react';
import { ScrollView } from 'react-native';

import { GradientBackground, TextInput } from '@components';
import styles from './styles';

const Login = (): ReactElement => {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Login Form */}
        <TextInput placeholder='Username' />
      </ScrollView>
    </GradientBackground>
  );
};

export default Login;
