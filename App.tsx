import React from 'react';
import {FlatList, StyleSheet, View, ViewToken} from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import data, {OnboardingData} from './src/data/data';
import {RenderItem} from './src/components/renderItem';
import {Pagination} from './src/components/Pagination';
import { CustomButton } from './src/components/CustomButton';

function App() {
  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>(); // Referencia para obter os valores de posicionamento da FlatList
  const x = useSharedValue(0); // Valor animado que pode ser compartilhado entre componentes.
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (!!viewableItems[0]?.index) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatlistRef}
        data={data}
        renderItem={({item, index}) => {
          return <RenderItem data={item} index={index} x={x} />;
        }}
        onScroll={onScroll}
        keyExtractor={item => item.id}
        scrollEventThrottle={16} // Controlar a velocidade de frequencia de rolagem
        horizontal
        bounces={false} // Desabilita o Efeito de Bounce da Lista
        pagingEnabled // Habilita paginação do scroll
        showsHorizontalScrollIndicator={false} // Desabilita scroll horizontal
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 100,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton 
          flatlistRef={flatlistRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default App;
