import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RestaurantCard = ({ restaurant }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.price}>₹{restaurant.price}</Text>
      <Button title="Add to Cart" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginVertical: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
});

export default RestaurantCard;
