import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  codeInputField: {
    color: colors.lightGreen,
    fontFamily: 'DeliusUnicase_400Regular',
    fontSize: 20,
    borderWidth: 0,
    backgroundColor: colors.purple,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: colors.lightGreen,
  },
  codeInputHighlight: {
    borderWidth: 1,
    borderColor: colors.lightPurple,
  },
  instructionsLabel: {
    color: colors.lightGreen,
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 18,
  },
  resendCodeLabel: {
    color: colors.lightGreen,
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'DeliusUnicase_700Bold',
    textDecorationLine: 'underline',
  },
});

export default styles;
