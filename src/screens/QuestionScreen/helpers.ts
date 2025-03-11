import {storage} from '../../storage/storage';
import {Difficulty, History} from '../../types/shared';
import {RenderableCity} from './types';

export const getRandomInt = (min: number, max: number, exclude?: number) => {
  let random: number;
  do {
    random = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude !== undefined && random === exclude);
  return random;
};

export const getCurrentDate = (): string => {
  return new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

export const saveHistoryToStorage = (
  prevHistory: History[],
  difficulty: Difficulty,
  history: {}[],
  renderableList: RenderableCity,
  cityId: number,
  won: boolean,
) => {
  storage.set(
    'history',
    JSON.stringify([
      ...prevHistory,
      {
        id: Date.now(),
        won,
        difficulty,
        time: getCurrentDate(),
        questions: [...history, {cities: renderableList, userAnswer: cityId}],
      },
    ]),
  );
};
