import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 120,
  },
  logo: {
    height: 150,
    maxWidth: '60%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 80,
  },
  button: {
    marginBottom: 20,
  },
  loggedInText: {
    marginTop: 80,
    color: colors.lightGreen,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default styles;
