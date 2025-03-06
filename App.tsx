import React from 'react';
import './global.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ScreenHeader from './src/components/ScreenHeader/ScreenHeader';

export type RootStackParamList = {
  Home: undefined;
  Details: {itemId: number; message: string};
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
            name="Details"
            component={DetailsScreen}
            options={{title: 'Details', header: () => <ScreenHeader />}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
