import {Difficulty} from '../types/shared';

export const difficulties: Difficulty[] = [
  {
    allowedMistakes: 1,
    difficulty: 'hard',
    hints: 1,
    numberOfQuestions: 20,
    possibleVariants: 4,
  },
  {
    allowedMistakes: 1,
    difficulty: 'medium',
    hints: 1,
    numberOfQuestions: 15,
    possibleVariants: 3,
  },
  {
    allowedMistakes: 1,
    difficulty: 'easy',
    hints: 0,
    numberOfQuestions: 10,
    possibleVariants: 2,
  },
];

export const dummyCities = [
  {
    id: 1,
    name: 'New York',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    latitude: 40.7128,
    longitude: -74.006,
    population: 8419600,
    region: 'New York',
    regionCode: 'NY',
    regionWdId: 'Q1384',
    type: 'city',
    wikiDataId: 'Q60',
  },
  {
    id: 2,
    name: 'London',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    latitude: 51.5074,
    longitude: -0.1278,
    population: 8982000,
    region: 'England',
    regionCode: 'ENG',
    regionWdId: 'Q21',
    type: 'city',
    wikiDataId: 'Q84',
  },
  {
    id: 3,
    name: 'Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    latitude: 35.6895,
    longitude: 139.6917,
    population: 13929286,
    region: 'Tokyo',
    regionCode: '13',
    regionWdId: 'Q10861965',
    type: 'city',
    wikiDataId: 'Q1490',
  },
  {
    id: 4,
    name: 'Paris',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    latitude: 48.8566,
    longitude: 2.3522,
    population: 2161000,
    region: 'Île-de-France',
    regionCode: 'IDF',
    regionWdId: 'Q13917',
    type: 'city',
    wikiDataId: 'Q90',
  },
];

export const textColor = 'dark:text-white text-black';

export const API_KEY = '6efacc61303b4cf224a38dfbafaad893';
