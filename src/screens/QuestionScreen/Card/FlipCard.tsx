import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export const FlipCard: React.FC<{
  isFlipped: SharedValue<boolean>;
  FlippedContent: ReactNode;
  RegularContent: ReactNode;
  direction?: 'x' | 'y';
  duration?: number;
}> = ({
  isFlipped,
  direction = 'y',
  duration = 500,
  RegularContent,
  FlippedContent,
}) => {
  const isDirectionX = direction === 'x';

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, {duration});

    return {
      transform: [
        isDirectionX ? {rotateX: rotateValue} : {rotateY: rotateValue},
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, {duration});

    return {
      transform: [
        isDirectionX ? {rotateX: rotateValue} : {rotateY: rotateValue},
      ],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          flipCardStyles.flipCard,
          regularCardAnimatedStyle,
        ]}>
        {RegularContent}
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          flipCardStyles.flipCard,
          flippedCardAnimatedStyle,
        ]}>
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    zIndex: 2,
  },
  flipCard: {
    width: 150,
    height: 150,
    backfaceVisibility: 'hidden',
  },
});
