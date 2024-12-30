import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

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

  // States for toggling visibility
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          {/* Profile Circle */}
          <Image
            source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }}
            style={styles.profileImage}
          />
          {/* User Details */}
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Text style={styles.userPhone}>+1 234 567 890</Text>
        </View>

        {/* My Favorites Section */}
        <TouchableOpacity style={styles.section} onPress={() => setShowFavorites(!showFavorites)}>
          <Text style={styles.sectionTitle}>My Favorites</Text>
        </TouchableOpacity>
        {showFavorites && (
          <View style={styles.dropdown}>
            {favorites.map((favorite, index) => (
              <Text key={index} style={styles.sectionContent}>{favorite.name} - ₹{favorite.price}</Text>
            ))}
          </View>
        )}

        <View style={styles.breakLine} />

        {/* Order History Section */}
        <TouchableOpacity style={styles.section} onPress={() => setShowOrderHistory(!showOrderHistory)}>
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
        
        <View style={styles.breakLine} />

        {/* Manage Delivery Address Section */}
        <TouchableOpacity style={styles.section} onPress={() => setShowAddress(!showAddress)}>
          <Text style={styles.sectionTitle}>Manage Delivery Address</Text>
        </TouchableOpacity>
        {showAddress && <Text style={styles.sectionContent}>{address}</Text>}

        <View style={styles.breakLine} />

        {/* Voucher Vault Section */}
        <TouchableOpacity style={styles.section} onPress={() => setShowCoupons(!showCoupons)}>
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
      </ScrollView>

      {/* Buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textDecorationLine: 'underline',
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
    color: '#4caf50', // Green for Delivered
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
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
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
  breakLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 15,
  },
});

export default ProfileScreen;
