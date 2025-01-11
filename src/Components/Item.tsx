import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StyledItem, StyledItemText} from '../StyledComponents';

export type TPost = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

const Item = (props: TPost) => {
  return (
    <StyledItem>
      <StyledItemText>{props.body}</StyledItemText>
    </StyledItem>
  );
};

export default Item;

const styles = StyleSheet.create({});
