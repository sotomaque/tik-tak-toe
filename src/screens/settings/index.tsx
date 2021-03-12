import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { GradientBackground, Text } from '@components';
import styles from './styles';

const Settings = () => {
  return (
    <GradientBackground>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={{ color: 'white' }}>Settings</Text>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default Settings;
