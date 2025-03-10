import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
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

const QuestionScreen: React.FC<QuestionScreenProps> = ({route, navigation}) => {
  const {difficulty} = route.params;

  const [randomOffsets, setRandomOffsets] = useState<number[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [allowedMistakes, setAllowedMistakes] = useState<number>(
    difficulty.allowedMistakes,
  );
  const [openedCardIds, setOpenedCardIds] = useState<number[]>([]);

  useEffect(() => {
    setOpenedCardIds([]);
  }, [setOpenedCardIds, questionCount]);

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
    questionCount,
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
  const isCitiesAvailable = cities.every(value => value !== undefined);

  const weatherQueries = isCitiesAvailable
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
    : isCitiesAvailable
    ? cities
    : [];

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  const guessHandler: (city: City) => void = city => {
    if (openedCardIds.find(id => city.id === id)) {
      return;
    }
    const renderedCityIds = isCitiesAvailable ? cities.map(c => c.id) : [];
    setOpenedCardIds(prevState => [...prevState, city.id]);
    if (city.correct) {
      setOpenedCardIds(renderedCityIds);
      if (questionCount === difficulty.numberOfQuestions) {
        Alert.alert('You Won', 'Do You Want To Try Again?', [
          {
            text: 'Try Again',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      } else {
        setTimeout(() => {
          setQuestionCount(prevState => prevState + 1);
        }, 2000);
      }
    } else {
      if (allowedMistakes === 0) {
        Alert.alert('You Lost', 'Do You Want To Try Again?', [
          {
            text: 'Try Again',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      } else {
        setAllowedMistakes(prevState => prevState - 1);
      }
    }
  };

  // const renderableList = dummyCities;

  return (
    <View className="flex-1 gap-4 items-center bg-lightBg dark:bg-darkBg p-3">
      <View className="flex-row justify-between w-full mb-4">
        <Text className={textColor}>Allowed Mistakes:{allowedMistakes}</Text>
        <Text className={`${textColor}`}>
          Question N: {questionCount}/{difficulty.numberOfQuestions}
        </Text>
      </View>
      <Text className={textColor}>Difficulty: {difficulty.difficulty}</Text>
      <Text className={textColor}>Guess Highest Temperature</Text>
      <View className="flex-row flex-wrap gap-2 items-center justify-center">
        {renderableList.map((city, index) => (
          <TouchableOpacity
            key={index + city.id}
            className="border rounded-md border-black dark:border-white basis-[40%] items-center p-1 min-h-24"
            onPress={() => guessHandler(city as City)}>
            <Card
              city={city as City}
              open={openedCardIds?.find(id => id === city.id) ? true : false}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuestionScreen;
