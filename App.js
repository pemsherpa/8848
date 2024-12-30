import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import { CartProvider } from "./context/CartContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider> {/* Wrap the app with CartProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthNavigator">
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;