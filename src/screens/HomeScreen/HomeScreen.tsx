import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

import {difficulties, textColor} from '../../data/data';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View className="flex-1 items-center  bg-lightBg dark:bg-darkBg gap-2">
      <Text className={`text-2xl ${textColor}`}>Choose Difficulty</Text>
      {difficulties.map((difficulty, index) => (
        <TouchableOpacity
          key={difficulty.difficulty + index}
          className="border rounded-md p-3 dark:bg-blue-300 bg-blue-800 w-32 items-center"
          onPress={() =>
            navigation.navigate('Question', {
              difficulty: difficulty,
            })
          }>
          <Text className="dark:text-black text-white text-xl">
            {difficulty.difficulty.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HomeScreen;
