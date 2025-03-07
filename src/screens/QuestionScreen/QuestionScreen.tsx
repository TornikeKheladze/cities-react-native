import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useQueries, useQuery} from '@tanstack/react-query';
import {getCities, getWeatherData} from '../../axios';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import Card from './Card/Card';
import {dummyCities, textColor} from '../../data/data';
import {City} from '../../types/shared';

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

  const {data: initialData, isFetched: initialFetched} = useQuery({
    queryKey: ['getCities'],
    queryFn: () => getCities(1),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (initialData?.metadata.totalCount) {
      const initialRandomOffset = [];
      for (let index = 0; index < difficulty.possibleVariants; index++) {
        initialRandomOffset.push(
          // getRandomInt(1, initialData?.metadata.totalCount / 10),
          getRandomInt(0, initialData?.metadata.totalCount),
        );
      }
      setRandomOffsets(initialRandomOffset);
    }
  }, [
    initialFetched,
    difficulty.possibleVariants,
    initialData?.metadata.totalCount,
    test,
  ]);

  const {data, pending} = useQueries({
    queries: randomOffsets.map(offset => {
      return {
        queryKey: [offset],
        queryFn: () => getCities(offset),
      };
    }),
    combine: results => {
      return {
        data: results.map(result => result.data),
        pending: results.some(result => result.isPending),
        fetched: results.some(result => result.isFetched),
      };
    },
  });

  const isLoading = pending || !initialFetched;

  const cities = useMemo(
    () => data.map(item => item?.data[getRandomInt(0, 9)]),
    [data],
  );

  const weatherQueries = cities.every(value => value !== undefined)
    ? cities.map(city => {
        return {
          queryKey: [city?.latitude, city?.longitude],
          queryFn: async () => {
            const res = await getWeatherData(city.latitude, city.longitude);
            return {
              temp: res.main.temp,
              ...city,
            };
          },
        };
      })
    : [];

  const {weatherWithCity} = useQueries({
    queries: weatherQueries,
    combine: results => {
      const temps = results.map(item => item.data?.temp);
      return {
        weatherWithCity: results.map(result => {
          const maxTemp = temps.every(value => value !== undefined)
            ? Math.max(...temps)
            : 0;
          return {
            id: result.data?.id || Math.random(),
            ...result.data,
            correct: maxTemp === result.data?.temp,
          };
        }),
      };
    },
  });

  const renderableList = weatherWithCity.every(value => value !== undefined)
    ? weatherWithCity
    : cities.every(value => value !== undefined)
    ? cities
    : [];

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <View className="flex-1 items-center bg-lightBg dark:bg-darkBg p-3">
      <Text className={textColor}>Difficulty: {difficulty.difficulty}</Text>
      <Text className={textColor}>Guess Highest Temperature</Text>
      <View className="flex-row flex-wrap gap-2 items-center justify-center">
        {renderableList.map((city, index) => (
          <Card key={index + city.id} city={city as City} />
        ))}
      </View>
      <Button title="test" onPress={() => setTest(test + 1)} />
    </View>
  );
};

export default QuestionScreen;
