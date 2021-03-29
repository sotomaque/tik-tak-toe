import { GetPlayerQuery } from '@api';
import { GraphQLResult } from '@aws-amplify/api';
import { GradientBackground, Text } from '@components';
import { useAuth } from '@context/auth-context';
import { API, graphqlOperation } from 'aws-amplify';
import React, { ReactElement, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { getPlayer } from './multiplayerHome.graphql';
import styles from './styles';

const MultiplayerHome = (): ReactElement => {
  const { user } = useAuth();

  useEffect(() => {
    const fetchPlayer = async (nextToken: string | null) => {
      if (!user) return;
      try {
        const player = (await API.graphql(
          graphqlOperation(getPlayer, {
            username: user.username,
            limit: 1,
            sortDirection: 'DESC',
            nextToken,
          })
        )) as GraphQLResult<GetPlayerQuery>;
      } catch (error) {
        console.error('error fetching player', error);
      }
    };

    fetchPlayer(null);
  }, []);

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
