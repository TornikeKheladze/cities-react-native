import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {textColor} from '../../data/data';

type HistoryDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'HistoryDetails'
>;

const HistoryDetails: React.FC<HistoryDetailsProps> = ({route}) => {
  const {history} = route.params;

  return (
    <SafeAreaView className="flex-1 bg-lightBg dark:bg-darkBg p-4 items-center">
      <View className="items-center gap-2">
        <Text className={textColor}>{history.time}</Text>
        <Text className={textColor}>
          {history.difficulty.difficulty.toUpperCase()}
        </Text>
        <Text className={` ${history.won ? 'text-green-500' : 'text-red-500'}`}>
          Result: {history.won ? 'Won' : 'Lost'}
        </Text>
        <Text className={textColor}>
          Questions: {history.questions.length}/
          {history.difficulty.numberOfQuestions}
        </Text>
      </View>

      <Text className={`${textColor} text-2xl mt-3`}>Questions:</Text>
      <ScrollView className="flex-1 p-3">
        {history.questions.map((q, index) => (
          <View
            key={q.userAnswer + Math.random()}
            className="rounded-2xl p-2 items-center gap-3 mb-8 dark:bg-slate-600 bg-slate-300">
            <Text className={textColor}>Question N:{index + 1}</Text>
            <View className="flex-row flex-wrap gap-3 items-center justify-between">
              {q.cities.map(city => (
                <View
                  key={city.id + Math.random()}
                  className=" bg-[#baeee5] rounded-2xl justify-center items-center h-[150px] w-[150px]">
                  {q.userAnswer === city.id && (
                    <Text
                      className={`${
                        city.correct ? 'text-green-500' : 'text-red-500'
                      }`}>
                      User Answer
                    </Text>
                  )}
                  <Text className="text-[#001a72] text-center underline">
                    {city.city}
                  </Text>
                  <Text className="text-[#001a72] text-center">
                    {city.region}
                  </Text>
                  <Text className="text-[#001a72] text-center">
                    {city.country}
                  </Text>
                  <Text className="text-[#001a72] text-center">
                    {city.temp} C
                  </Text>
                  <Text
                    className={`${
                      city.correct ? 'text-green-500' : 'text-red-500'
                    }`}>
                    {city.correct ? 'Correct' : 'Wrong'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryDetails;
