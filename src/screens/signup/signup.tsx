import { Button, GradientBackground, Text, TextInput } from '@components';
import { StackNavigatorParams } from '@config/navigator';
import { StackNavigationProp, useHeaderHeight } from '@react-navigation/stack';
import OTPInput from '@twotalltotems/react-native-otp-input';
import { Auth } from 'aws-amplify';
import React, { ReactElement, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput as RNTextInput,
} from 'react-native';
import styles from './styles';

type SignupProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'Signup'>;
};

const Signup = ({ navigation }: SignupProps): ReactElement => {
  // Refs for jumping from one input to the next with keyboard
  const emailRef = useRef<RNTextInput | null>(null);
  const nameRef = useRef<RNTextInput | null>(null);
  const passwordRef = useRef<RNTextInput | null>(null);

  const [form, setForm] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'signUp' | 'otp'>('signUp');

  const headerHeight = useHeaderHeight();

  const setFormInput = (key: keyof typeof form, value: string): void => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
    setLoading(true);
    const { username, email, name, password } = form;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name,
        },
      });
      setStep('otp');
    } catch (error) {
      console.error('error signing up', error);
      Alert.alert('Error!', error?.message || 'An error occured!');
    }

    setLoading(false);
  };

  const handleConfirmCode = async (code: string) => {
    try {
      setLoading(true);
      await Auth.confirmSignUp(form.username, code);
      navigation.navigate('Home');
      Alert.alert('Success', 'You can now login with your new account');
    } catch (error) {
      Alert.alert('Error', 'An error occurred!');
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
          {step === 'otp' ? (
            loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Text style={styles.instructionsLabel}>
                  Enter code sent to your email
                </Text>
                <OTPInput
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.codeInputField}
                  codeInputHighlightStyle={styles.codeInputHighlight}
                  onCodeFilled={code => handleConfirmCode(code)}
                  pinCount={6}
                  placeholderCharacter='0'
                  placeholderTextColor='#5d5379'
                  style={{ width: '85%', alignSelf: 'center' }}
                />
              </>
            )
          ) : (
            <>
              {/* Login Form */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                autoFocus
                onChangeText={value => setFormInput('username', value)}
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
                placeholder='Username'
                returnKeyType='next'
                style={{
                  marginBottom: 20,
                }}
                value={form.username}
              />
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={value => setFormInput('email', value)}
                onSubmitEditing={() => {
                  nameRef.current?.focus();
                }}
                placeholder='Email'
                ref={emailRef}
                returnKeyType='next'
                style={{
                  marginBottom: 20,
                }}
                keyboardType='email-address'
                value={form.email}
              />
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={value => setFormInput('name', value)}
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
                placeholder='Name'
                ref={nameRef}
                returnKeyType='next'
                style={{
                  marginBottom: 20,
                }}
                value={form.name}
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
              <Button title='Signup' onPress={handleSignup} loading={loading} />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default Signup;
