import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icon library

const ProfileScreen = () => {
  const [orderHistory] = useState([
    { id: 1, name: 'Veg Fix Thali', date: '2024-12-01', price: 150, status: 'Delivered' },
    { id: 2, name: 'Das Kitchen', date: '2024-12-05', price: 100, status: 'Pending' },
  ]);
  const [favorites] = useState([
    { name: 'Veg Fix Thali', price: 150 },
    { name: 'Das Kitchen', price: 100 },
  ]);
  const [address] = useState('Ziffy HQ, Panipokhari, Kathmandu');
  const [coupons] = useState([
    { code: 'GAME10', discount: '10%', used: false },
    { code: 'NEWYEAR20', discount: '20%', used: true },
  ]);

  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Text style={styles.userPhone}>+977 9841753555</Text>
        </View>

        {/* My Favorites Section */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.section} onPress={() => setShowFavorites(!showFavorites)}>
            <Icon name="favorite" size={24} color="#4caf50" style={styles.icon} />
            <Text style={styles.sectionTitle}>My Favorites</Text>
          </TouchableOpacity>
          {showFavorites && (
            <View style={styles.dropdown}>
              {favorites.map((favorite, index) => (
                <Text key={index} style={styles.sectionContent}>
                  {favorite.name} - ₹{favorite.price}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Order History Section */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.section} onPress={() => setShowOrderHistory(!showOrderHistory)}>
            <Icon name="history" size={24} color="#4caf50" style={styles.icon} />
            <Text style={styles.sectionTitle}>Order History</Text>
          </TouchableOpacity>
          {showOrderHistory &&
            orderHistory.map((order) => (
              <View key={order.id} style={styles.historyItem}>
                <Text style={styles.historyText}>{order.name}</Text>
                <Text style={styles.historyText}>₹{order.price}</Text>
                <Text style={styles.historyDate}>{order.date}</Text>
                <Text style={styles.orderStatus}>{order.status}</Text>
              </View>
            ))}
        </View>

        {/* Manage Delivery Address Section */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.section} onPress={() => setShowAddress(!showAddress)}>
            <Icon name="location-on" size={24} color="#4caf50" style={styles.icon} />
            <Text style={styles.sectionTitle}>Manage Delivery Address</Text>
          </TouchableOpacity>
          {showAddress && <Text style={styles.sectionContent}>{address}</Text>}
        </View>

        {/* Voucher Vault Section */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.section} onPress={() => setShowCoupons(!showCoupons)}>
            <Icon name="redeem" size={24} color="#4caf50" style={styles.icon} />
            <Text style={styles.sectionTitle}>Voucher Vault</Text>
          </TouchableOpacity>
          {showCoupons &&
            coupons.map((coupon) => (
              <View key={coupon.code} style={styles.couponItem}>
                <Text style={styles.couponText}>{coupon.code}</Text>
                <Text style={styles.couponText}>Discount: {coupon.discount}</Text>
                <Text style={coupon.used ? styles.usedCoupon : styles.activeCoupon}>
                  {coupon.used ? 'Used' : 'Active'}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>

      {/* Buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
  },
  userPhone: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  section: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyText: {
    fontSize: 16,
    color: '#333',
  },
  historyDate: {
    fontSize: 12,
    color: '#888',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  couponItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  couponText: {
    fontSize: 16,
    color: '#333',
  },
  usedCoupon: {
    color: '#888',
    fontSize: 14,
  },
  activeCoupon: {
    color: '#4caf50',
    fontSize: 14,
  },
  buttonContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20, // Added padding to prevent buttons from touching the edges
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 8,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  dropdown: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 5,
  },
});

export default ProfileScreen;
