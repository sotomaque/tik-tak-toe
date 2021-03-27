import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  ChangePassword,
  ForgotPassword,
  Home,
  Login,
  Settings,
  Signup,
  SinglePlayerGame,
} from '@screens';
import { colors } from '@utils';
import React, { ReactElement } from 'react';

export type StackNavigatorParams = {
  Home: undefined;
  Login: undefined;
  Settings: undefined;
  Signup: { username: string; password: string } | undefined;
  SinglePlayerGame: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
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
        <Stack.Screen
          name='ChangePassword'
          component={ChangePassword}
          options={{ title: 'Change Password' }}
        />
        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}
          options={{ title: 'Forgot Password' }}
        />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{ title: 'Sign-Up' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
