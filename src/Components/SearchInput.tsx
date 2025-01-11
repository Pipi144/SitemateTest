import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated from 'react-native-reanimated';
import {useNewContext} from '../Provider/NewProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};
const StorageSearchKey = 'searchKey';
const SearchInput = (props: Props) => {
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
    </Animated.View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
  },
});
