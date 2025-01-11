import {StyleSheet, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  FadeInRight,
  FadeOutRight,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useNewContext} from '../Provider/NewProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedPressable from './CustomUI/AnimatedPressable';

type Props = {};
const StorageSearchKey = 'searchKey';
const SearchInput = ({}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const {setSearchText} = useNewContext();

  const initializeSearchValue = async () => {
    try {
      const searchValue = await AsyncStorage.getItem(StorageSearchKey);
      if (searchValue) {
        setSearchValue(searchValue);
      }
    } catch (error) {
      throw new Error('Error while getting search value');
    }
  };

  //throtthle the search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchText(searchValue);
      AsyncStorage.setItem(StorageSearchKey, searchValue);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  // get search value from storage
  useEffect(() => {
    initializeSearchValue();
  }, []);
  return (
    <Animated.View style={styles.container}>
      <TextInput
        value={searchValue}
        onChangeText={setSearchValue}
        style={styles.textInputStyle}
        placeholder="Search news..."
        placeholderTextColor={'gray'}
      />

      {searchValue && (
        <AnimatedPressable
          onPress={() => setSearchValue('')}
          entering={FadeInRight.springify().damping(16).mass(0.5)}
          exiting={FadeOutRight.springify().damping(16).mass(0.5)}
          hitSlop={14}>
          <Text style={styles.clearText}>Clear</Text>
        </AnimatedPressable>
      )}
    </Animated.View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',

    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',

    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  textInputStyle: {
    flex: 1,
    fontSize: 16,
  },
  clearText: {
    color: 'red',
    fontSize: 16,
  },
});
