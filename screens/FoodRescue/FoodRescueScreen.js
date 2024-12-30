import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FoodRescueScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Rescue Mission</Text>
      <Text>Receive cheaper orders when food is canceled within your radius!</Text>
      <Button title="Check Availability" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FoodRescueScreen;
