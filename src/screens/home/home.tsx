import Auth from '@aws-amplify/auth';
import { Button, GradientBackground, Text } from '@components';
import { StackNavigatorParams } from '@config/navigator';
import { useAuth } from '@context/auth-context';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { ReactElement, useState } from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';
import styles from './styles';

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
          <Button
            style={styles.button}
            title={'Mulitplayer'}
            onPress={() => {
              if (user) {
                navigation.navigate('MultiplayerHome');
              } else {
                navigation.navigate('Login', { redirect: 'MultiplayerHome' });
              }
            }}
          />
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
