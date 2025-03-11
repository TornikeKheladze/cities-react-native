import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {storage} from '../../storage/storage';
import {History} from '../../types/shared';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {textColor} from '../../data/data';

type HistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'History'>;

const HistoryScreen: React.FC<HistoryScreenProps> = ({navigation}) => {
  const historiesJSON = storage.getString('history');

  const historyies: History[] = historiesJSON ? JSON.parse(historiesJSON) : [];

  const onHistoryPress = (history: History) => {
    navigation.navigate('HistoryDetails', {history});
  };

  return (
    <View className="flex-1 bg-lightBg dark:bg-darkBg p-4">
      {historyies.length === 0 ? (
        <Text className={textColor}>No History Yet</Text>
      ) : (
        <ScrollView>
          {historyies.reverse().map(h => (
            <TouchableOpacity
              key={h.id}
              onPress={() => onHistoryPress(h)}
              className="border p-2 rounded-lg dark:bg-slate-300 bg-darkBg gap-2 mt-2">
              <Text className="dark:text-black text-white">{h.time}</Text>
              <Text className="dark:text-black text-white">
                Difficulty: {h.difficulty.difficulty}
              </Text>
              <Text className={` ${h.won ? 'text-green-500' : 'text-red-500'}`}>
                Result: {h.won ? 'Won' : 'Lost'}
              </Text>
              <Text className="dark:text-black text-white">
                Questions: {h.questions.length}/{h.difficulty.numberOfQuestions}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default HistoryScreen;
