if (__DEV__) {
  require('./ReactotronConfig');
}

import React from 'react';
import './global.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ScreenHeader from './src/components/ScreenHeader/ScreenHeader';
import QuestionScreen from './src/screens/QuestionScreen/QuestionScreen';
import {Difficulty, History} from './src/types/shared';
import HistoryScreen from './src/screens/HistoryScreen/HistoryScreen';
import HistoryDetails from './src/screens/HistoryScreen/HistoryDetails';

export type RootStackParamList = {
  Home: undefined;
  Question: {difficulty: Difficulty};
  History: undefined;
  HistoryDetails: {history: History};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Welcome', header: () => <ScreenHeader />}}
          />
          <Stack.Screen
            name="Question"
            component={QuestionScreen}
            options={{title: 'Question', header: () => <ScreenHeader />}}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{title: 'History', header: () => <ScreenHeader />}}
          />
          <Stack.Screen
            name="HistoryDetails"
            component={HistoryDetails}
            options={{title: 'HistoryDetails', header: () => <ScreenHeader />}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
