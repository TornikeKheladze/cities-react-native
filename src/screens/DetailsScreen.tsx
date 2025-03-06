import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({route}) => {
  const {itemId, message} = route.params;

  return (
    <View className="flex-1 items-center justify-center bg-lightBg dark:bg-darkBg">
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Message: {message}</Text>
    </View>
  );
};

export default DetailsScreen;
