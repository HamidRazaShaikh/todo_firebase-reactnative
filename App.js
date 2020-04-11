
import 'react-native-gesture-handler';

import * as React from 'react';
import auth from '@react-native-firebase/auth';
import SignUp from './components/signUp.js';
import TodoList from './components/todolist.js';
import Login  from './components/login.js';
import Testing from './components/testing.js'


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TodoList"
          component={TodoList}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Testing"
          component={Testing}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
