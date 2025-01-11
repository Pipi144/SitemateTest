import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import React, {forwardRef} from 'react';
import Animated, {
  AnimateProps,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = AnimateProps<PressableProps>;

const AnimatedPress = Animated.createAnimatedComponent(Pressable);
const AnimatedPressable = forwardRef<View, Props>((props, ref) => {
  const pressSharedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressSharedValue.value, [1, 0.9], [1, 0.9]);
    const borderRadius = interpolate(pressSharedValue.value, [1, 0], [0, 10]);
    return {
      borderRadius,
      transform: [{scale}],
    };
  });
  return (
    <AnimatedPress
      ref={ref}
      style={animatedStyle}
      onPressIn={() => {
        pressSharedValue.value = withSpring(0, {damping: 16, mass: 0.5});
      }}
      onPressOut={() => {
        pressSharedValue.value = withSpring(1, {damping: 16, mass: 0.5});
      }}
      {...props}
    />
  );
});

export default AnimatedPressable;

const styles = StyleSheet.create({});
