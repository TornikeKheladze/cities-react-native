import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useQueries, useQuery} from '@tanstack/react-query';
import {getCities} from '../../axios';

type QuestionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Question'
>;

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({route}) => {
  const {difficulty} = route.params;

  const [randomOffsets, setRandomOffsets] = useState<number[]>([]);
  const [test, setTest] = useState(0);

  const {data: initialData, isFetched} = useQuery({
    queryKey: ['getCities'],
    queryFn: () => getCities(1),
  });

  useEffect(() => {
    if (initialData?.metadata.totalCount) {
      const initialRandomOffset = [];
      for (let index = 0; index < difficulty.possibleVariants; index++) {
        initialRandomOffset.push(
          getRandomInt(1, initialData?.metadata.totalCount / 10),
        );
      }
      setRandomOffsets(initialRandomOffset);
    }
  }, [
    isFetched,
    difficulty.possibleVariants,
    initialData?.metadata.totalCount,
  ]);

  const {data, pending} = useQueries({
    queries: randomOffsets.map(offset => {
      return {
        queryKey: [offset],
        queryFn: () => getCities(offset),
        enabled: randomOffsets.length === difficulty.possibleVariants,
      };
    }),
    combine: results => {
      return {
        data: results.map(result => result.data),
        pending: results.some(result => result.isPending),
      };
    },
  });

  const cities = useMemo(
    () => data.map(item => item?.data[getRandomInt(1, 10)]),
    [data],
  );

  return (
    <View className="flex-1 items-center  bg-lightBg dark:bg-darkBg">
      <Text>Details Screen</Text>
      <Text>Item ID: {difficulty.difficulty}</Text>
      {cities.every(value => value !== undefined) &&
        cities.map(city => <Text key={city.id}>{city?.city}</Text>)}
      <Button title="test" onPress={() => setTest(test + 1)} />
    </View>
  );
};

export default QuestionScreen;
