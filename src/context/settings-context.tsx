import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Difficulty key represents the depth our
// simulation will run before making an 'optimal' decision
const difficulties = {
  '1': 'Beginner',
  '3': 'Intermediate',
  '4': 'Hard',
  '-1': 'Impossible',
};

type SettingsType = {
  difficulty: keyof typeof difficulties;
  haptics: boolean;
  sounds: boolean;
};

const defaultSettings: SettingsType = {
  difficulty: '-1',
  haptics: true,
  sounds: true,
};

type SettingsContextType = {
  settings: SettingsType | null;
  loadSettings: () => void;
  saveSetting: <T extends keyof SettingsType>(
    setting: T,
    value: SettingsType[T]
  ) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within settings provider');
  }
  return context;
}

function SettingsProvider(props: { children: ReactNode }): ReactElement {
  const [settings, setSettings] = useState<SettingsType | null>(null);

  // load settings from async storage
  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('@settings');
      savedSettings !== null
        ? setSettings(JSON.parse(savedSettings))
        : setSettings(defaultSettings);
    } catch (error) {
      setSettings(defaultSettings);
    }
  };

  const saveSetting = async <T extends keyof SettingsType>(
    setting: T,
    value: SettingsType[T]
  ) => {
    try {
      const oldSettings = settings ? settings : defaultSettings;
      const newSettings = { ...oldSettings, [setting]: value };
      await AsyncStorage.setItem('@settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      Alert.alert('Error!', 'An error has occurred');
      // console.error('error saving settings', error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      {...props}
      value={{
        settings,
        saveSetting,
        loadSettings,
      }}
    />
  );
}

export { useSettings, SettingsProvider, difficulties };
