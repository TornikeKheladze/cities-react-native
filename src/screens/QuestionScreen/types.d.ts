import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {Difficulty} from '../../types/shared';
import {RouteProp} from '@react-navigation/native';

export type RenderableCity = {
  city?: string;
  country?: string;
  countryCode?: string;
  id: number;
  latitude?: number;
  longitude?: number;
  name?: string;
  population?: number;
  region?: string;
  regionCode?: string;
  regionWdId?: string;
  type?: string;
  wikiDataId?: string;
  temp?: number;
  correct?: boolean;
}[];

export type UseQuestionScreen = (
  route: RouteProp<RootStackParamList, 'Question'>,
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'Question',
    undefined
  >,
) => {
  difficulty: Difficulty;
  allowedMistakes: number;
  questionCount: number;
  onHintPress: () => void;
  renderableList: RenderableCity;
  hints: number;
  guessHandler: (city: City) => void;
  openedCardIds: number[];
  isLoading: boolean;
};

export type QuestionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Question'
>;
