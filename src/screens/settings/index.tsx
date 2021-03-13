import React, { ReactElement } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';

import { useSettings, difficulties } from '@context/settings-context';
import { GradientBackground, Text } from '@components';
import { colors } from '@utils';
import styles from './styles';

const Settings = (): ReactElement | null => {
  // dont show UI until settings are loaded
  const { settings, saveSetting } = useSettings();
  if (!settings) return null;

  return (
    <GradientBackground>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Difficulties */}
          <View style={styles.field}>
            <Text style={styles.label}>Bot Difficulty</Text>
            <View style={styles.difficultyContainer}>
              {Object.keys(difficulties).map(level => {
                return (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.difficultyOption,
                      {
                        backgroundColor:
                          settings.difficulty === level
                            ? colors.lightPurple
                            : colors.lightGreen,
                      },
                    ]}
                    onPress={() => {
                      saveSetting(
                        'difficulty',
                        level as keyof typeof difficulties
                      );
                    }}
                  >
                    <Text
                      weight='700'
                      style={[
                        styles.difficultylabel,
                        {
                          color:
                            settings.difficulty === level
                              ? colors.lightGreen
                              : colors.darkPurple,
                        },
                      ]}
                    >
                      {difficulties[level as keyof typeof difficulties]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {/* Sound */}
          <View style={[styles.field, styles.switchField]}>
            <Text style={styles.label}>Sounds</Text>
            <Switch
              trackColor={{
                false: colors.purple,
                true: colors.lightPurple,
              }}
              thumbColor={colors.lightGreen}
              ios_backgroundColor={colors.purple}
              value={settings.sounds}
              onValueChange={() => {
                saveSetting('sounds', !settings.sounds);
              }}
            />
          </View>
          {/* Haptics */}
          <View style={[styles.field, styles.switchField]}>
            <Text style={styles.label}>Haptics / Vibrations</Text>
            <Switch
              trackColor={{
                false: colors.purple,
                true: colors.lightPurple,
              }}
              thumbColor={colors.lightGreen}
              ios_backgroundColor={colors.purple}
              value={settings.haptics}
              onValueChange={() => {
                saveSetting('haptics', !settings.haptics);
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default Settings;
