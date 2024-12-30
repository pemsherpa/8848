import React from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Switch } from 'react-native';

const CartScreen = ({ navigation }) => {
  const cartItems = [{ name: 'Das Kitchen', price: 100 }, { name: 'Veg Fix Thali', price: 100 }];
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const darkStyles = isDarkMode ? styles.dark : {};

  return (
    <ScrollView style={[styles.container, darkStyles]}>
      {/* Dark/Light Mode Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleText, darkStyles]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? "#fff" : "#bbb"}
          trackColor={{ false: "#ddd", true: "#333" }}
        />
      </View>

      <Text style={[styles.title, darkStyles]}>Your Cart</Text>
      {cartItems.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={[styles.itemText, darkStyles]}>{item.name}</Text>
          <Text style={[styles.itemPrice, darkStyles]}>₹{item.price}</Text>
        </View>
      ))}
      <Text style={[styles.total, darkStyles]}>Total: ₹{total}</Text>
      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  dark: {
    backgroundColor: "#121212",
    color: "#fff",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default CartScreen;
