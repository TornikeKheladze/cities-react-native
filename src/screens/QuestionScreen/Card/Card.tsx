import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {City} from '../../../types/shared';
import {textColor} from '../../../data/data';

const Card: React.FC<{city: City}> = ({city}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsOpen(true)}
      className="border rounded-md border-black dark:border-white basis-[40%] items-center p-1 min-h-44">
      <Text className={textColor}>{city.country}</Text>
      <Text className={textColor}>{city.city}</Text>
      {isOpen && (
        <View>
          <Text className={textColor}>{city.temp} C</Text>
          <Text>Your Guess Is {city.correct ? 'Correct' : 'Wrong'}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Card;
