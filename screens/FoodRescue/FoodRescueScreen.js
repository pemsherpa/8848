import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const FoodRescueScreen = () => {
  const [offers, setOffers] = useState([
    { id: '1', name: 'Veg Fix Thali', originalPrice: 150, discountedPrice: 120, stolen: false },
    { id: '2', name: 'Das Kitchen', originalPrice: 100, discountedPrice: 80, stolen: false },
  ]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const [showOffers, setShowOffers] = useState(false); // State to control when to show offers

  const handleCheckAvailability = () => {
    setLoading(true); // Start loading
    setMessage(''); // Clear previous messages

    // Simulate a 2-second delay before showing the offers
    setTimeout(() => {
      setLoading(false); // Stop loading
      setShowOffers(true); // Show the offers after the delay
    }, 2000);
  };

  const handleStealOffer = (index) => {
    setLoading(true); // Set loading to true while processing the steal
    setMessage(''); // Clear previous messages

    // Simulate a delay for stealing the offer
    setTimeout(() => {
      const updatedOffers = [...offers];
      updatedOffers[index].stolen = true; // Mark the offer as stolen
      setOffers(updatedOffers);
      setMessage(`You have stolen the offer for ${updatedOffers[index].name} at ₹${updatedOffers[index].discountedPrice}!`);

      // Remove the stolen offer after 1 minute (60000ms)
      setTimeout(() => {
        const remainingOffers = updatedOffers.filter(offer => offer.id !== updatedOffers[index].id);
        setOffers(remainingOffers); // Remove the offer from the list
      }, 60000);

      setLoading(false); // Stop loading
    }, 2000);
  };

  const renderOffer = (offer, index) => (
    <View style={styles.offerItem} key={offer.id}>
      <Text style={styles.offerName}>{offer.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.originalPrice}>₹{offer.originalPrice}</Text>
        <Text style={styles.discountedPrice}>₹{offer.discountedPrice}</Text>
      </View>
      <TouchableOpacity
        style={styles.stealButton}
        onPress={() => handleStealOffer(index)} // Steal the offer when clicked
        disabled={offer.stolen} // Disable the button if the offer is already stolen
      >
        <Text style={styles.stealButtonText}>
          {offer.stolen ? 'Offer Stolen' : 'Steal Offer'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Rescue Mission</Text>
      <Text style={styles.description}>Receive cheaper orders when food is canceled within your radius!</Text>

      <Button title="Check Availability" onPress={handleCheckAvailability} />

      {loading ? (
        <ActivityIndicator size="large" color="#D32F2F" style={styles.loading} />
      ) : (
        showOffers && offers.map((offer, index) => renderOffer(offer, index))
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F', // Red theme color
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: '#555',
  },
  offerItem: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  offerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#D32F2F', // Red theme color for original price
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  stealButton: {
    marginTop: 10,
    backgroundColor: '#D32F2F', // Red theme color for the button
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
  },
  stealButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50', // Green color for the success message
    textAlign: 'center',
  },
  loading: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default FoodRescueScreen;
