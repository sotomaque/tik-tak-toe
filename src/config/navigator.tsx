import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { colors } from '@utils';
import { Home, Settings, SinglePlayerGame, Login } from '@screens';

export type StackNavigatorParams = {
  Home: undefined;
  Login: undefined;
  Settings: undefined;
  SinglePlayerGame: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

const navigatorOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.purple,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerTintColor: colors.lightGreen,
  headerTitleStyle: {
    fontFamily: 'DeliusUnicase_700Bold',
    fontSize: 20,
  },
  headerBackTitleStyle: {
    fontFamily: 'DeliusUnicase_400Regular',
    fontSize: 14,
  },
};

const Navigator = (): ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={navigatorOptions}>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='SinglePlayerGame'
          component={SinglePlayerGame}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
