import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import Card from './Card/Card';
import {textColor} from '../../data/data';
import {City} from '../../types/shared';
import {useQuestionScreen} from './useQuestionScreen';
import {QuestionScreenProps} from './types';

const QuestionScreen: React.FC<QuestionScreenProps> = ({route, navigation}) => {
  const {
    difficulty,
    allowedMistakes,
    questionCount,
    onHintPress,
    renderableList,
    hints,
    guessHandler,
    openedCardIds,
    isLoading,
  } = useQuestionScreen(route, navigation);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <View className="flex-1 gap-4 items-center bg-lightBg dark:bg-darkBg p-3">
      <View className="flex-row justify-between w-full mb-4">
        <Text className={textColor}>Allowed Mistakes:{allowedMistakes}</Text>
        <Text className={textColor}>
          Question N: {questionCount}/{difficulty.numberOfQuestions}
        </Text>
      </View>
      <Text className={textColor}>Difficulty: {difficulty.difficulty}</Text>
      <Text className={textColor}>Guess Highest Temperature</Text>
      {difficulty.difficulty !== 'easy' && (
        <TouchableOpacity
          onPress={onHintPress}
          className="bg-green-500 p-3 rounded-xl">
          <Text>Hint: {hints}</Text>
        </TouchableOpacity>
      )}

      <View className="flex-row flex-wrap gap-2 items-center justify-center">
        {renderableList.map((city, index) => (
          <TouchableOpacity
            className="h-[150px]"
            key={index + city.id}
            onPress={() => guessHandler(city as City)}>
            <Card
              city={city as City}
              open={openedCardIds?.find(id => id === city.id) ? true : false}
              index={index}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuestionScreen;
