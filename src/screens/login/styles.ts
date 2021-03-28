import { colors, globalStyles } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  registerLink: {
    color: colors.lightGreen,
    textAlign: 'center',
    marginTop: 80,
    textDecorationLine: 'underline',
  },
  forgotPasswordLabel: {
    color: colors.lightGreen,
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
});

export default styles;
