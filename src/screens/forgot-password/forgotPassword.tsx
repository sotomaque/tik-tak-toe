import Auth from '@aws-amplify/auth';
import { Button, GradientBackground, TextInput } from '@components';
import { StackNavigatorParams } from '@config/navigator';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, useHeaderHeight } from '@react-navigation/stack';
import React, { ReactElement, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from './styles';

type ForgotPasswordProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'ForgotPassword'>;
  route: RouteProp<StackNavigatorParams, 'ForgotPassword'>;
};

const ForgotPassword = ({
  navigation,
  route,
}: ForgotPasswordProps): ReactElement => {
  const headerHeight = useHeaderHeight();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<'1' | '2'>('1');
  const [form, setForm] = useState({
    username: '',
    password: '',
    code: '',
  });

  const setFormInput = (key: keyof typeof form, value: string): void => {
    setForm({ ...form, [key]: value });
  };

  const handleUsernameSubmit = async () => {
    const { username } = form;
    setLoading(true);
    try {
      await Auth.forgotPassword(username);
      setStep('2');
    } catch (error) {
      Alert.alert('Error', 'an error occurred!');
    }
    setLoading(false);
  };

  const handleForgotPasswordSubmit = async () => {
    console.log('in correct handler');
    const { username, code, password } = form;
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(username, code, password);
      Alert.alert('Success!', 'Password successfully changed');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'an error occurred!');
    }
    setLoading(false);
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {step === '1' ? (
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={false}
              autoFocus
              onChangeText={value => setFormInput('username', value)}
              placeholder='Username'
              style={{
                marginTop: 20,
                marginBottom: 30,
              }}
              value={form.username}
            />
          ) : (
            <>
              <TextInput
                autoFocus
                keyboardType='numeric'
                onChangeText={value => setFormInput('code', value)}
                placeholder='Verification Code'
                style={{
                  marginTop: 20,
                  marginBottom: 30,
                }}
                value={form.code}
              />
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={value => setFormInput('password', value)}
                placeholder='New Password'
                returnKeyType='done'
                secureTextEntry
                style={{
                  marginBottom: 30,
                }}
                value={form.password}
              />
            </>
          )}

          <Button
            title='Submit'
            onPress={
              step === '1' ? handleUsernameSubmit : handleForgotPasswordSubmit
            }
            loading={loading}
            disabled={
              step === '1'
                ? !form.username
                : !form.username && !form.code && !form.password
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default ForgotPassword;
