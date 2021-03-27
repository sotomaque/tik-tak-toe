import { Button, GradientBackground, Text, TextInput } from '@components';
import { StackNavigatorParams } from '@config/navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import React, { ReactElement, useRef, useState } from 'react';
import {
  Alert,
  ScrollView,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

type LoginProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'Login'>;
};

const Login = ({ navigation }: LoginProps): ReactElement => {
  const passwordRef = useRef<RNTextInput | null>(null);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const setFormInput = (key: keyof typeof form, value: string): void => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    const { username, password } = form;
    try {
      await Auth.signIn(username, password);
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        navigation.navigate('Signup', { username, password });
      } else {
        console.error('error logining in', error);
        Alert.alert('Error!', error?.message || 'An error occured!');
      }
    }

    setLoading(false);
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Login Form */}
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus
          onChangeText={value => setFormInput('username', value)}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          placeholder='Username'
          returnKeyType='next'
          style={{
            marginBottom: 20,
          }}
          value={form.username}
        />
        <TextInput
          onChangeText={value => setFormInput('password', value)}
          placeholder='Password'
          ref={passwordRef}
          returnKeyType='done'
          secureTextEntry={true}
          style={{
            marginBottom: 20,
          }}
          value={form.password}
        />

        <Button title='Login' onPress={handleLogin} loading={loading} />

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.registerLink}>Don&apos;t Have an Account?</Text>
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
};

export default Login;
