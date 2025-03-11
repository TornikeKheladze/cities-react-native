import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {City} from '../../../types/shared';
import {FlipCard} from './FlipCard';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

type CardProps = {
  city: City;
  open: boolean;
  index: number;
};

const Card: React.FC<CardProps> = ({city, open, index}) => {
  const isFlipped = useSharedValue(open);

  useEffect(() => {
    isFlipped.value = open;
  }, [open, isFlipped]);

  const translateY = useSharedValue(-200);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      index * 200,
      withTiming(0, {duration: 600, easing: Easing.out(Easing.exp)}),
    );

    opacity.value = withDelay(index * 200, withTiming(1, {duration: 300}));
  }, [index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }));

  return (
    <View className="w-full h-full items-center justify-center">
      <Animated.View style={[animatedStyle]}>
        <FlipCard
          isFlipped={isFlipped}
          FlippedContent={
            <View className="flex-1 bg-[#baeee5] rounded-2xl justify-center items-center">
              <Text className="text-[#001a72] text-center underline">
                {city.city}
              </Text>
              <Text className="text-[#001a72] text-center">{city.region}</Text>
              <Text className="text-[#001a72] text-center">{city.country}</Text>
              <Text className="text-[#001a72] text-center">{city.temp} C</Text>
              <Text
                className={`${
                  city.correct ? 'text-green-500' : 'text-red-500'
                }`}>
                {city.correct ? 'Correct' : 'Wrong'}
              </Text>
            </View>
          }
          RegularContent={
            <View className="flex-1 bg-[#b6cff7] rounded-2xl justify-center items-center">
              <Text className="text-[#001a72] text-center underline">
                {city.city}
              </Text>
              <Text className="text-[#001a72] text-center">{city.region}</Text>
              <Text className="text-[#001a72] text-center">{city.country}</Text>
            </View>
          }
        />
      </Animated.View>
    </View>
  );
};

export default Card;
