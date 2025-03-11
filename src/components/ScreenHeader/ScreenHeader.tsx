import {Switch, TouchableOpacity} from 'react-native';
import React from 'react';
import {useColorScheme} from 'nativewind';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButtonIcon} from '../../assets/svg';
import {useNavigation, useRoute} from '@react-navigation/native';

const ScreenHeader = () => {
  const {colorScheme, setColorScheme} = useColorScheme();
  const {goBack} = useNavigation();
  const {name} = useRoute();

  return (
    <SafeAreaView className="bg-lightBg dark:bg-darkBg p-3 flex-row justify-between items-center pt-10">
      {name !== 'Question' && (
        <TouchableOpacity onPress={() => goBack()} className="w-10 h-10">
          <BackButtonIcon />
        </TouchableOpacity>
      )}

      <Switch
        value={colorScheme === 'dark' ? true : false}
        onValueChange={() =>
          setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
        }
      />
    </SafeAreaView>
  );
};

export default ScreenHeader;
