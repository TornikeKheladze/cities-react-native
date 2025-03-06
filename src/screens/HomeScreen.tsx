import React from 'react';
import {Button, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useQuery} from '@tanstack/react-query';
import {getCities} from '../axios';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {data} = useQuery({
    queryKey: ['getCities'],
    queryFn: getCities,
  });

  return (
    <View className="flex-1 items-center justify-center bg-lightBg dark:bg-darkBg">
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 123,
            message: 'Hello from Home',
          })
        }
      />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 123,
            message: 'Hello from Home',
          })
        }
      />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 123,
            message: 'Hello from Home',
          })
        }
      />
    </View>
  );
};

export default HomeScreen;
