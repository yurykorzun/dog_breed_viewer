import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DogBreedProvider} from './src/context/DogBreedProvider';
import HomeScreen from './src/screens/Home';
import BreedDetailsScreen from './src/screens/BreedDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <DogBreedProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="ListBreeds"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="BreedDetail" component={BreedDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DogBreedProvider>
  );
};

export default App;
