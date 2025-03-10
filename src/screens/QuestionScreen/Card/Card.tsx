import {View, Text} from 'react-native';
import React from 'react';
import {City} from '../../../types/shared';
import {textColor} from '../../../data/data';

type CardProps = {
  city: City;
  open: boolean;
};

const Card: React.FC<CardProps> = ({city, open}) => {
  return (
    <View>
      <Text className={textColor}>{city.country}</Text>
      <Text className={textColor}>{city.city}</Text>
      {open && (
        <View>
          <Text className={textColor}>{city.temp} C</Text>
          <Text
            className={`${city.correct ? 'text-green-500' : 'text-red-500'}`}>
            {city.correct ? 'Correct' : 'Wrong'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Card;
