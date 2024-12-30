import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import FoodRescueScreen from '../screens/FoodRescue/FoodRescueScreen';
import KiteGameScreen from '../screens/KiteGame/KiteGameScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Food Rescue" component={FoodRescueScreen} />
      <Tab.Screen name="Kite Game" component={KiteGameScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
