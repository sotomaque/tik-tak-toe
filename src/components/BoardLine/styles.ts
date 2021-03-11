import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    backgroundColor: colors.lightPurple,
  },
  vLine: {
    width: 4,
  },
  hLine: {
    height: 4,
  },
  dLine: {
    width: 4,
    top: 0,
    left: '50%',
  },
});

export default styles;
