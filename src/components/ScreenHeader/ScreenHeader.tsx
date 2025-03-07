import {Text} from 'react-native';
import React from 'react';
import {useColorScheme} from 'nativewind';
import {SafeAreaView} from 'react-native-safe-area-context';
import SwitchToggle from 'react-native-switch-toggle';

const ScreenHeader = () => {
  const {colorScheme, setColorScheme} = useColorScheme();

  return (
    <SafeAreaView className="bg-lightBg dark:bg-darkBg p-3">
      <Text className="text-black dark:text-white">Toggle Theme</Text>
      <SwitchToggle
        switchOn={colorScheme === 'dark' ? true : false}
        onPress={() =>
          setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
        }
        containerStyle={containerStyle}
        circleStyle={circleStyle}
      />
    </SafeAreaView>
  );
};

const containerStyle = {
  marginTop: 16,
  width: 60,
  height: 30,
  borderRadius: 25,
  paddingRight: 50,
};

const circleStyle = {
  width: 25,
  height: 25,
  borderRadius: 25,
};

export default ScreenHeader;
