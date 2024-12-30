import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CartItem = ({ item, removeFromCart }) => (
  <View style={styles.cartItem}>
    <Text>{item.name} - ${item.price}</Text>
    <Button title="Remove" onPress={() => removeFromCart(item.id)} />
  </View>
);

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default CartItem;
