import { colors, globalStyles } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
  },
  difficultyText: {
    color: colors.lightGreen,
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 80,
  },
  resultsBox: {
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: colors.lightPurple,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
  },
  resultsTitle: {
    color: colors.darkPurple,
    fontSize: 14,
  },
  resultsCount: {
    color: colors.darkPurple,
    fontSize: 20,
  },
  modal: {
    position: 'absolute',
    backgroundColor: colors.lightPurple,
    bottom: 40,
    left: 30,
    right: 30,
    padding: 30,
    borderWidth: 3,
    borderColor: colors.lightGreen,
  },
  modalText: {
    color: colors.lightGreen,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default styles;
