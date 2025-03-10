export type City = {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  regionWdId: string;
  type: string;
  wikiDataId: string;
  temp?: number;
  correct: boolean;
};

export type Difficulty = {
  difficulty: 'hard' | 'medium' | 'easy';
  numberOfQuestions: 10 | 15 | 20;
  allowedMistakes: 0 | 1;
  hints: 0 | 1;
  possibleVariants: 2 | 3 | 4;
};
