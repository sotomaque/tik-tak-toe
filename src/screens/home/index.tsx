import React, { ReactElement, useState } from 'react';
import { ScrollView, View, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParams } from '@config/navigator';
import { GradientBackground, Button, Text } from '@components';

import styles from './styles';
import { useAuth } from '@context/auth-context';
import Auth from '@aws-amplify/auth';

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'Home'>;
};

const Home = ({ navigation }: HomeProps): ReactElement => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (user) {
      try {
        setLoading(true);
        await Auth.signOut();
      } catch (error) {
        Alert.alert('Error', 'an error occurred!');
      }
      setLoading(false);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('@assets/logo.png')} style={styles.logo} />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('SinglePlayerGame')}
            style={styles.button}
            title={'Single Player'}
          />
          <Button style={styles.button} title={'Mulitplayer'} />
          <Button
            loading={loading}
            onPress={handleLogin}
            style={styles.button}
            title={user ? 'Logout' : 'Login'}
          />
          <Button
            onPress={() => navigation.navigate('Settings')}
            title={'Settings'}
          />
        </View>
        {user && (
          <Text weight='400' style={styles.loggedInText}>
            Logged in as <Text weight='700'>{user.username}</Text>
          </Text>
        )}
      </ScrollView>
    </GradientBackground>
  );
};

export default Home;
