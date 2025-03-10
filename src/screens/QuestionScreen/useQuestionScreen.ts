import {useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useQueries, useQuery} from '@tanstack/react-query';
import {getCities, getWeatherData} from '../../axios';
import {City} from '../../types/shared';
import {UseQuestionScreen} from './types';

function getRandomInt(min: number, max: number, exclude?: number): number {
  let random: number;
  do {
    random = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude !== undefined && random === exclude);
  return random;
}

export const useQuestionScreen: UseQuestionScreen = (route, navigation) => {
  const {difficulty} = route.params;

  const [randomOffsets, setRandomOffsets] = useState<number[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [allowedMistakes, setAllowedMistakes] = useState<number>(
    difficulty.allowedMistakes,
  );
  const [hints, sethints] = useState<number>(difficulty.hints);

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
        setOpenedCardIds(renderedCityIds);
        setTimeout(() => {
          Alert.alert('You Lost', 'Do You Want To Try Again?', [
            {
              text: 'Try Again',
              onPress: () => navigation.navigate('Home'),
            },
          ]);
        }, 2000);
      } else {
        setAllowedMistakes(prevState => prevState - 1);
      }
    }
  };

  const onHintPress = () => {
    if (hints === 0) {
      return;
    } else {
      sethints(hints - 1);
      const incorrectCities = renderableList
        .filter(city => city.correct === false)
        .filter(city => city.id !== openedCardIds[0]);

      if (difficulty.difficulty === 'hard') {
        setOpenedCardIds(prevState => {
          const randomInt = getRandomInt(0, incorrectCities.length - 1);
          const randomInt2 = getRandomInt(
            0,
            incorrectCities.length - 1,
            randomInt,
          );
          return [
            ...prevState,
            incorrectCities[randomInt].id,
            incorrectCities[randomInt2].id,
          ];
        });
      }
      if (difficulty.difficulty === 'medium') {
        setOpenedCardIds(prevState => {
          const randomInt = getRandomInt(0, incorrectCities.length - 1);
          return [...prevState, incorrectCities[randomInt].id];
        });
      }
    }
  };

  // const renderableList = dummyCities;

  return {
    difficulty,
    allowedMistakes,
    questionCount,
    onHintPress,
    renderableList,
    hints,
    guessHandler,
    openedCardIds,
    isLoading,
  };
};
