import {StyleSheet} from 'react-native';
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

type Props = {};

const MainApp = (props: Props) => {
  const {searchText} = useNewContext();
  const res = getAPIQuery(searchText);
  const data = res.data?.data.articles ?? [];

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
        ListEmptyComponent={<StyledText>Search for your news...</StyledText>}
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

const styles = StyleSheet.create({});
