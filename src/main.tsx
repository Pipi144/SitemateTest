import {StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {StyledAppRoot} from './StyledComponents';
import {getAPIQuery} from './Query/query';
import {useShallow} from 'zustand/shallow';
import {useGlobalStore} from './Store/GlobalStore';

type Props = {};

const MainApp = (props: Props) => {
  const res = getAPIQuery();
  const {theme} = useGlobalStore(
    useShallow(state => ({
      theme: state.theme,
    })),
  );
  // useEffect(() => {
  //   console.log(res);
  // }, [res]);

  return (
    <StyledAppRoot>
      <Text>MainApp</Text>
    </StyledAppRoot>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
