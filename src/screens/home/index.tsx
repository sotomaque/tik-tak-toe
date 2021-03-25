import React, { ReactElement } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParams } from '@config/navigator';
import { GradientBackground, Button } from '@components';

import styles from './styles';

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'Home'>;
};

const Home = ({ navigation }: HomeProps): ReactElement => {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('@assets/logo.png')} style={styles.logo} />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title={'Single Player'}
            onPress={() => navigation.navigate('SinglePlayerGame')}
          />
          <Button style={styles.button} title={'Mulitplayer'} />
          <Button
            style={styles.button}
            title={'Login'}
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title={'Settings'}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default Home;
