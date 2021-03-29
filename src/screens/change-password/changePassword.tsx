import Auth from '@aws-amplify/auth';
import { Button, GradientBackground, TextInput } from '@components';
import { StackNavigatorParams } from '@config/navigator';
import { useAuth } from '@context/auth-context';
import { StackNavigationProp, useHeaderHeight } from '@react-navigation/stack';
import React, { ReactElement, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput as RNTextInput,
} from 'react-native';
import styles from './styles';

type ChangePasswordProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'ChangePassword'>;
};

const ChangePassword = ({ navigation }: ChangePasswordProps): ReactElement => {
  const headerHeight = useHeaderHeight();
  const { user } = useAuth();
  // Refs for jumping from one input to the next with keyboard
  const newPasswordRef = useRef<RNTextInput | null>(null);

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const setFormInput = (key: keyof typeof form, value: string): void => {
    setForm({ ...form, [key]: value });
  };

  const handleChangePassword = async () => {
    setLoading(true);
    const { oldPassword, newPassword } = form;
    try {
      await Auth.changePassword(user, oldPassword, newPassword);
      setForm({ oldPassword: '', newPassword: '' });
      Alert.alert('Success!', 'Password changed successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error!', error.message || 'An Error has occurred');
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
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={value => setFormInput('oldPassword', value)}
            onSubmitEditing={() => {
              newPasswordRef.current?.focus();
            }}
            placeholder='Old Password'
            returnKeyType='next'
            secureTextEntry={true}
            style={{
              marginBottom: 20,
            }}
            value={form.oldPassword}
          />
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={value => setFormInput('newPassword', value)}
            placeholder='New Password'
            ref={newPasswordRef}
            returnKeyType='done'
            secureTextEntry={true}
            style={{
              marginBottom: 20,
            }}
            value={form.newPassword}
          />
          <Button
            title='Submit'
            loading={loading}
            onPress={handleChangePassword}
            disabled={!form.oldPassword || !form.newPassword}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default ChangePassword;
