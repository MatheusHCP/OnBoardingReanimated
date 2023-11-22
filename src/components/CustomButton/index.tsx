import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native';
import Animated, { AnimatedRef, SharedValue, interpolateColor, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { OnboardingData } from '../../data/data';

type Props = {
  dataLength: number
  flatListIndex: SharedValue<number>
  flatlistRef: AnimatedRef<FlatList<OnboardingData>>
  x: SharedValue<number>
}

export function CustomButton({dataLength, flatListIndex, flatlistRef, x}: Props){
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const buttonAnimationStyle = useAnimatedStyle(() => {

    return {
      width: flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
      height: 60

    }
  })

  const arrowAnimationStyle = useAnimatedStyle(() => {

    return {
      width: 30,
      height: 30,
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [{
        translateX: flatListIndex.value === dataLength - 1 ? withTiming(100) : withTiming(0)
      }]

    }
  })


  const textAnimationStyle = useAnimatedStyle(() => {

    return {
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [{
        translateX: flatListIndex.value === dataLength - 1 ? withSpring(0) : withTiming(-100)
      }]
    }
  })

  const animatedColor = useAnimatedStyle(() => {

    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#005b4f', '#1e2169', '#f15937']
    )

    return {
      backgroundColor: backgroundColor
    }

  })

return (
   <TouchableWithoutFeedback
    onPress={() => {
      if(flatListIndex.value < dataLength -1){
        flatlistRef.current?.scrollToIndex({index: flatListIndex.value + 1})
      }
      else {
        console.log("NAVIGATE TO NEXT SCREEN")
      }
    }}
   >
    <Animated.View style={[styles.container, animatedColor, buttonAnimationStyle]}>
      <Animated.Text style={[styles.textButton, textAnimationStyle]}>Get Started</Animated.Text>
      <Animated.Image source={require("../../assets/images/ArrowIcon.png")} 
        style={[styles.arrow, arrowAnimationStyle]}
        />
    </Animated.View>
   </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: 60,
    height: 60
  },
  arrow: {
    position: 'absolute',
    width: 30,
    height: 30
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    position: 'absolute'
  }
});