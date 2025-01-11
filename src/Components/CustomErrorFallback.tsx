import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import AnimatedPressable from './CustomUI/AnimatedPressable';

type Props = {
  error: Error;
  resetError: Function;
};

const CustomErrorFallback = ({error, resetError}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleError}>Something wrong! {error.name}</Text>
      <Text>{error.message}</Text>

      <AnimatedPressable onPress={() => resetError()}>
        <Text style={styles.retryText}>Retry</Text>
      </AnimatedPressable>
    </View>
  );
};

export default CustomErrorFallback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleError: {
    fontSize: 20,
    fontWeight: 600,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 400,
    marginVertical: 20,
  },
  retryBtn: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  retryText: {
    color: 'white',
  },
});
