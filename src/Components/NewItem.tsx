import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TNew} from '../Models/news';
import Animated from 'react-native-reanimated';

const NewItem = (props: TNew) => {
  return (
    <Animated.View style={styles.container}>
      <Image
        source={{uri: props.urlToImage}}
        style={styles.imageStyle}
        resizeMode="cover"
      />

      <View style={styles.contentWrapper}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text
          style={styles.descriptionText}
          numberOfLines={2}
          ellipsizeMode="tail">
          {props.description}
        </Text>
        <Text style={styles.authorText}>
          {props.author || 'Unknown author'}
        </Text>
      </View>
    </Animated.View>
  );
};

export default NewItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    display: 'flex',

    height: 120,
    borderWidth: 1,
    borderColor: 'gray',
  },
  imageStyle: {
    height: '100%',
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 10,
  },
  contentWrapper: {
    flex: 1,
    height: '100%',
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'gray',
    marginTop: 5,
  },
  authorText: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: 'black',
    opacity: 0.8,
    marginTop: 'auto',
    textAlign: 'right',
  },
});
