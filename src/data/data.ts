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
