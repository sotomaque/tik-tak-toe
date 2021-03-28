import { colors, globalStyles } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  field: {
    marginBottom: 30,
  },
  label: {
    color: colors.lightGreen,
    fontSize: 18,
  },
  difficultyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginHorizontal: -5,
  },
  difficultyOption: {
    backgroundColor: colors.lightGreen,
    padding: 10,
    margin: 5,
  },
  difficultylabel: {
    color: colors.darkPurple,
  },
  switchField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changePasswordLabel: {
    color: colors.lightGreen,
    marginTop: 30,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

export default styles;
