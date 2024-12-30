import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Checkout = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Button title="Proceed to Delivery" onPress={() => navigation.navigate('Delivery')} />
      <Button title="Go Back to Cart" onPress={() => navigation.goBack()} />
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

export default Checkout;
