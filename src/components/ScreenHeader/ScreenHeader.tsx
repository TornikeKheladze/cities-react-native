import {Text, Pressable} from 'react-native';
import React from 'react';
import {useColorScheme} from 'nativewind';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScreenHeader = () => {
  const {colorScheme, setColorScheme} = useColorScheme();

  return (
    <SafeAreaView className="bg-lightBg dark:bg-darkBg">
      <Text className="text-black dark:text-white text-xl">
        {colorScheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Pressable
        onPress={() =>
          setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
        }
        className="mt-4 px-4 py-2 rounded-lg bg-blue-500">
        <Text className="text-white">Toggle Theme</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ScreenHeader;
