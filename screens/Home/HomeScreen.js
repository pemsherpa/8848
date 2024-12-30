import React, { useState, useContext } from "react";
import { useColorScheme } from "react-native";
import { CartContext } from "../../context/CartContext"; 
import Alex from "../../assets/images/AlexEatery.png";
import hotDog from "../../assets/images/hotdog.png";
import burger from "../../assets/images/burger.png";
import tandoori from "../../assets/images/tandoori.png";
import veg from "../../assets/images/veg.png";
import cake from "../../assets/images/cake.png";
import offer from "../../assets/images/offer.png";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const scheme = useColorScheme(); 
  const { addToCart } = useContext(CartContext); 
  const [vegMode, setVegMode] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const toggleVegMode = () => {
    setVegMode((prevState) => !prevState);
  };

  const restaurants = [
    {
      id: 1,
      name: "Alex Eatery",
      details: "North Indian, Snacks",
      price: "100",
      time: "15 mins",
      distance: "1 km",
      image: Alex,
      isVeg: false,
    },
    {
      id: 2,
      name: "Hot Dogg",
      details: "Pizza, Fast Food",
      price: "175",
      time: "25 mins",
      distance: "1.5 km",
      image: hotDog,
      isVeg: false,
    },
    {
      id: 3,
      name: "Cupcake House",
      details: "Bakery, Cafe",
      price: "100",
      time: "35 mins",
      distance: "2.5 km",
      image: cake,
      isVeg: true,
    },
    {
      id: 4,
      name: "Yummy Burger",
      details: "Burgers",
      price: "200",
      time: "40 mins",
      distance: "3 km",
      image: burger,
      isVeg: false,
    },
    {
      id: 5,
      name: "Tandoori Feast",
      details: "North Indian, Tandoor",
      price: "150",
      time: "20 mins",
      distance: "1.2 km",
      image: tandoori,
      isVeg: false,
    },
    {
      id: 6,
      name: "Salad Bar",
      details: "Vegies, Salad",
      price: "300",
      time: "45 mins",
      distance: "4 km",
      image: veg,
      isVeg: true,
    },
  ];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesVegMode = !vegMode || restaurant.isVeg;
    return matchesSearch && matchesVegMode;
  });

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: scheme === "dark" ? "#121212" : "#fff" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.locationText,
                { color: scheme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Welcome, Foodie :)
            </Text>
            <Text
              style={[
                styles.subLocationText,
                { color: scheme === "dark" ? "#ccc" : "#777" },
              ]}
            >
              Ziffy HQ, Panipokhari
            </Text>
          </View>
        </View>

        {/* Search Bar and Veg Mode Toggle */}
        <View style={styles.searchVegContainer}>
          <TextInput
            style={[
              styles.searchInput,
              { backgroundColor: scheme === "dark" ? "#333" : "#f9f9f9" },
            ]}
            placeholder="Name your mood..."
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholderTextColor={scheme === "dark" ? "#ccc" : "#888"}
          />
          <View style={styles.vegModeContainer}>
            <Text
              style={[
                styles.vegModeText,
                { color: scheme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Veg Mode
            </Text>
            <Switch
              value={vegMode}
              onValueChange={toggleVegMode}
              thumbColor={vegMode ? "#4caf50" : "#bbb"}
              trackColor={{ false: "#ddd", true: "#81c784" }}
            />
          </View>
        </View>

        {/* Promotional Image */}
        <Image source={offer} style={styles.promotionalImage} />

        {/* Restaurant List */}
        <Text
          style={[
            styles.sectionTitle,
            { color: scheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          ------- Popular Restaurants -------
        </Text>
        <View style={styles.restaurantSection}>
          {filteredRestaurants.map((restaurant) => (
            <View
              key={restaurant.id}
              style={[
                styles.restaurantCard,
                { backgroundColor: scheme === "dark" ? "#333" : "#fff" },
              ]}
            >
              <Image source={restaurant.image} style={styles.restaurantCardImage} />
              <View style={styles.restaurantCardInfo}>
                <View style={styles.restaurantText}>
                  <Text
                    style={[
                      styles.restaurantName,
                      { color: scheme === "dark" ? "#fff" : "#000" },
                    ]}
                  >
                    {restaurant.name}
                  </Text>
                  <Text
                    style={[
                      styles.restaurantDetails,
                      { color: scheme === "dark" ? "#ccc" : "#777" },
                    ]}
                  >
                    {restaurant.details}
                  </Text>
                  <Text
                    style={[
                      styles.restaurantMeta,
                      { color: scheme === "dark" ? "#bbb" : "#999" },
                    ]}
                  >
                    {restaurant.time} | {restaurant.distance}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(restaurant)} 
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.restaurantPrice}>Rs {restaurant.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D32F2F",
  },
  subLocationText: {
    fontSize: 14,
    color: "#777",
  },
  searchVegContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  vegModeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vegModeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  promotionalImage: {
    width: "100%",
    height: 180,
    marginBottom: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "#D32F2F",
  },
  restaurantSection: {
    marginHorizontal: 20,
  },
  restaurantCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  restaurantCardImage: {
    width: "100%",
    height: 140,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  restaurantCardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  restaurantText: {
    flex: 1,
    marginRight: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D32F2F",
  },
  restaurantDetails: {
    fontSize: 14,
    marginBottom: 4,
    color: "#777",
  },
  restaurantMeta: {
    fontSize: 12,
    color: "#999",
  },
  addButton: {
    backgroundColor: "#D32F2F",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  restaurantPrice: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D32F2F",
  },
});

export default HomeScreen;
