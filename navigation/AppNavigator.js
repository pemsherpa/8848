import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import FoodRescueScreen from '../screens/FoodRescue/FoodRescueScreen';
import KiteGameScreen from '../screens/KiteGame/KiteGameScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for icons

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all screens (optional)
        tabBarActiveTintColor: 'tomato', // Active tab icon color
        tabBarInactiveTintColor: 'gray', // Inactive tab icon color
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} /> // Home icon
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} /> // Cart icon
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} /> // Profile icon
          ),
        }}
      />
      <Tab.Screen
        name="Food Rescue"
        component={FoodRescueScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} /> // Food Rescue icon
          ),
        }}
      />
      <Tab.Screen
        name="Kite Game"
        component={KiteGameScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane" size={size} color={color} /> // Kite Game icon (airplane as a metaphor)
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
