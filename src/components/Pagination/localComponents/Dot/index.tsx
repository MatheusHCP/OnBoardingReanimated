import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  index: number;
  x: SharedValue<number>;
};

export function Dot({index, x}: Props) {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [10, 20, 10],
      Extrapolate.CLAMP,
    );

    const opacityanimated = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityanimated,
    };

  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
      ["#005B4F", "#1E2169", "#F15937"],
    )
    return {
      backgroundColor: backgroundColor
    }
  })

  return <Animated.View style={[styles.dot, animatedDotStyle, animatedColor]} />;
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
