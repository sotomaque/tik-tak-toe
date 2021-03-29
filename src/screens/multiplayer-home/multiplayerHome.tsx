import { GradientBackground, Text } from '@components';
import { useAuth } from '@context/auth-context';
import React, { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';

const MultiplayerHome = (): ReactElement => {
  const { user } = useAuth();

  return (
    <GradientBackground>
      {user ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.text}>{user.username}</Text>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>
            You must be logged in to play multiplayer games
          </Text>
        </View>
      )}
    </GradientBackground>
  );
};

export default MultiplayerHome;
