import React, { ReactElement } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParams } from '@config/navigator';

import styles from './styles';

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'Home'>;
};

const Home = ({ navigation }: HomeProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title='Game'
        onPress={() => navigation.navigate('Game', { gameId: '1' })}
      />
    </View>
  );
};

export default Home;
