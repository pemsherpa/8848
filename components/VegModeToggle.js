import React from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';

const VegModeToggle = ({ vegMode, toggleVegMode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Veg Mode</Text>
      <Switch value={vegMode} onValueChange={toggleVegMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default VegModeToggle;
