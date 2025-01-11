import {Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {TPost} from './Components/Item';

export const StyledAppRoot = styled(Animated.View)<{}>`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled(Animated.Text)`
  font-size: 24px;
  color: black;
  font-weight: bold;
  text-align: center;
` as typeof Animated.Text;

export const StyledItem = styled.View`
  width: 100%;
  padding: 10px 0px;
`;

export const StyledItemText = styled.Text`
  font-size: 15px;
  color: black;
  font-weight: normal;
  text-align: center;
` as typeof Text;

export const StyledPostList = styled(Animated.FlatList<TPost>)`
  flex: 1;
  width: 100%;
` as typeof Animated.FlatList<TPost>;
