import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const KiteGameScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kite Game</Text>
      <Text>Enjoy the kite flying game!</Text>
      <Button title="Start Game" onPress={() => {}} />
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

export default KiteGameScreen;
