import {Alert, Switch, TouchableOpacity} from 'react-native';
import React from 'react';
import {useColorScheme} from 'nativewind';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButtonIcon} from '../../assets/svg';
import {useNavigation, useRoute} from '@react-navigation/native';

const ScreenHeader = () => {
  const {colorScheme, setColorScheme} = useColorScheme();
  const {goBack, canGoBack} = useNavigation();
  const {name} = useRoute();

  const onPress = () => {
    if (name === 'Question') {
      Alert.alert('Go Back?', 'Your Progress will be lost', [
        {
          text: 'CANCEL',
        },
        {
          text: 'OK',
          onPress: () => goBack(),
        },
      ]);
    } else {
      goBack();
    }
  };

  return (
    <SafeAreaView
      className={`bg-lightBg dark:bg-darkBg p-3 flex-row ${
        canGoBack() ? 'justify-between' : 'justify-end'
      } items-center pt-10`}>
      {canGoBack() && (
        <TouchableOpacity onPress={onPress} className="w-10 h-10">
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
