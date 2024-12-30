import React, { useState } from "react";
import { useColorScheme } from "react-native";
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
  const scheme = useColorScheme(); // Detect current theme (dark or light)
  const [vegMode, setVegMode] = useState(false); // Veg Mode toggle state
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

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
      price: "₹100",
      time: "15 mins",
      distance: "1 km",
      image: Alex,
      isVeg: false,
    },
    {
      id: 2,
      name: "Hot Dogg",
      details: "Pizza, Fast Food",
      price: "₹175",
      time: "25 mins",
      distance: "1.5 km",
      image: hotDog,
      isVeg: false,
    },
    {
      id: 3,
      name: "Cupcake House",
      details: "Bakery, Cafe",
      price: "₹100",
      time: "35 mins",
      distance: "2.5 km",
      image: cake,
      isVeg: true,
    },
    {
      id: 4,
      name: "Yummy Burger",
      details: "Burgers",
      price: "₹200",
      time: "40 mins",
      distance: "3 km",
      image: burger,
      isVeg: false,
    },
    {
      id: 5,
      name: "Tandoori Feast",
      details: "North Indian, Tandoor",
      price: "₹150",
      time: "20 mins",
      distance: "1.2 km",
      image: tandoori,
      isVeg: false,
    },
    {
      id: 6,
      name: "Salad Bar",
      details: "Vegies, Salad",
      price: "₹300",
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
              Ziffy hq, Panipokhari
            </Text>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Text
                style={[
                  styles.iconText,
                  { color: scheme === "dark" ? "#fff" : "#000" },
                ]}
              ></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Text
                style={[
                  styles.iconText,
                  { color: scheme === "dark" ? "#fff" : "#000" },
                ]}
              ></Text>
            </TouchableOpacity>
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
          -------Popular Restaurants-------
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
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.restaurantPrice}>{restaurant.price}</Text>
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
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subLocationText: {
    fontSize: 14,
  },
  icons: {
    flexDirection: "row",
    gap: 16,
  },
  iconText: {
    fontSize: 20,
  },
  searchVegContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16, // Added spacing above search bar
    marginBottom: 16, // Added spacing below search bar
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    padding: 8,
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
    height: 150,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  restaurantSection: {
    marginHorizontal: 16,
  },
  restaurantCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  restaurantCardImage: {
    width: "100%",
    height: 120,
  },
  restaurantCardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  restaurantText: {
    flex: 1,
    marginRight: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  restaurantDetails: {
    fontSize: 14,
    marginBottom: 4,
  },
  restaurantMeta: {
    fontSize: 12,
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
    paddingHorizontal: 12,
    paddingBottom: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#D32F2F",
  },
});

export default HomeScreen;
