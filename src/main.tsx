import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StyledAppRoot, StyledPostList, StyledText} from './StyledComponents';
import {getAPIQuery} from './Query/query';
import {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  LinearTransition,
  StretchInY,
  StretchOutY,
  useSharedValue,
} from 'react-native-reanimated';
import {useNewContext} from './Provider/NewProvider';
import NewItem from './Components/NewItem';
import SearchInput from './Components/SearchInput';
import AnimatedPressable from './Components/CustomUI/AnimatedPressable';

type Props = {};

const MainApp = (props: Props) => {
  const {searchText} = useNewContext();
  const newsQuery = getAPIQuery(searchText);
  const data = newsQuery.data?.data.articles ?? [];

  const handleRetry = () => {
    newsQuery.refetch();
  };
  return (
    <StyledAppRoot entering={FadeInUp} exiting={StretchOutY}>
      <StyledPostList
        data={data}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({item}) => <NewItem {...item} />}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={20}
        updateCellsBatchingPeriod={800}
        removeClippedSubviews={true}
        itemLayoutAnimation={LinearTransition.springify().damping(16).mass(0.5)}
        ListEmptyComponent={
          <View style={styles.emptyListWrapper}>
            <StyledText>
              {newsQuery.isError
                ? 'Failed to search news'
                : 'Search for your news...'}
            </StyledText>
            {newsQuery.isError && (
              <AnimatedPressable style={styles.retryBtn} onPress={handleRetry}>
                <Text style={{color: 'white', fontSize: 16}}>Retry</Text>
              </AnimatedPressable>
            )}
          </View>
        }
        ListHeaderComponent={SearchInput}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        getItemLayout={(data, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
      />
    </StyledAppRoot>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  emptyListWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryBtn: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
  },
});
