import {StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {StyledAppRoot, StyledPostList, StyledText} from './StyledComponents';
import {getAPIQuery} from './Query/query';
import {useShallow} from 'zustand/shallow';
import {useGlobalStore} from './Store/GlobalStore';
import Animated, {
  Extrapolation,
  interpolate,
  LinearTransition,
  StretchInY,
  StretchOutY,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Item from './Components/Item';

type Props = {};

const MainApp = (props: Props) => {
  const res = getAPIQuery();
  const data = res.data?.data ?? [];
  const {theme} = useGlobalStore(
    useShallow(state => ({
      theme: state.theme,
    })),
  );
  // useEffect(() => {
  //   console.log(res);
  // }, [res]);
  const textSharedValue = useSharedValue(0);
  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      textSharedValue.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const scaleX = interpolate(
      textSharedValue.value,
      [0, 1],
      [0.5, 1],
      Extrapolation.CLAMP,
    );
    return {opacity, transform: [{scaleX}]};
  }, [textSharedValue.value]);

  useEffect(() => {
    textSharedValue.value = withRepeat(
      withTiming(1, {duration: 2000}),
      -1,
      true,
    );
  }, []);

  return (
    <StyledAppRoot
      entering={StretchInY.springify().damping(16).mass(0.5)}
      exiting={StretchOutY}>
      <StyledText>Hello Peter will pass</StyledText>

      <StyledPostList
        data={data}
        style={textAnimatedStyle}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Item {...item} />}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        updateCellsBatchingPeriod={800}
        removeClippedSubviews={true}
        itemLayoutAnimation={LinearTransition.springify().damping(16).mass(0.5)}
      />
    </StyledAppRoot>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
