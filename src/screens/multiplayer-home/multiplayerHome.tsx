import { GetPlayerQuery } from '@api';
import { GraphQLResult } from '@aws-amplify/api';
import { GradientBackground } from '@components';
import { useAuth } from '@context/auth-context';
import { API, graphqlOperation } from 'aws-amplify';
import React, { ReactElement, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getPlayer } from './multiplayerHome.graphql';
import styles from './styles';

export type PlayerGamesType = Exclude<
  Exclude<GetPlayerQuery['getPlayer'], null>['games'],
  null
>['items'];

export type PlayerGameType = Exclude<PlayerGamesType, null>[0];

const MultiplayerHome = (): ReactElement => {
  const [playerGames, setPlayerGames] = useState<PlayerGameType[] | null>(null);
  const [nextToken, setNextToken] = useState<string | null>(null);
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
        console.log('player', player);
        if (player.data?.getPlayer?.games) {
          setPlayerGames(player.data.getPlayer.games.items);
          setNextToken(player.data.getPlayer.games.nextToken);
        }
      } catch (error) {
        console.error('error fetching player', error);
      }
    };

    fetchPlayer(null);
  }, []);

  const renderGames = ({ item }: { item: PlayerGameType }) => {
    const game = item?.game;
    console.log('game', game);
    return <></>;
  };

  return (
    <GradientBackground>
      {user ? (
        <FlatList
          contentContainerStyle={styles.container}
          data={playerGames}
          renderItem={renderGames}
          keyExtractor={playerGame => `${playerGame?.gameId}`}
        />
      ) : (
        <></>
      )}
    </GradientBackground>
  );
};

export default MultiplayerHome;
