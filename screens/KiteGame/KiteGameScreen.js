import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';

const KiteGameScreen = () => {
  const [countdown, setCountdown] = useState(0); // Timer for the game
  const [discount, setDiscount] = useState(0); // Discount percentage
  const [running, setRunning] = useState(false); // Game running state
  const [kiteLost, setKiteLost] = useState(false); // Kite crash status
  const [fontsLoaded, setFontsLoaded] = useState(false); // Custom font loaded
  const kitePosition = useRef(new Animated.ValueXY({ x: 20, y: 700 })).current; // Start kite at bottom-left

  useEffect(() => {
    let interval = null;

    if (running && !kiteLost) {
      // Start countdown and discount
      interval = setInterval(() => {
        setCountdown((prev) => prev + 0.05);

        // Increment discount
        setDiscount((prev) => {
          if (prev < 30) {
            return prev + 0.2; // Increment faster to keep within 30%
          }
          return prev;
        });

        // Check kite crash odds
        if (Math.random() < countdown / 30) {
          setKiteLost(true);
          setRunning(false);
          Alert.alert('CHANGA CHET!!!!');
          startKiteCrashAnimation();
        }
      }, 100); // Update every 100ms for slower increments

      // Animate kite movement (slower)
      Animated.timing(kitePosition, {
        toValue: { x: Math.random() * 300, y: Math.random() * 300 },
        duration: 900, // Slower animation duration
        useNativeDriver: false,
      }).start();
    }

    return () => clearInterval(interval);
  }, [running, kiteLost, countdown]);

  // Load custom font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'MarioWorld': require('/Users/kashchitbikramthapa/Desktop/88488/frontend/screens/KiteGame/TypefaceMarioWorldPixelFilledRegular-rgVMx.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handlePress = () => {
    if (running) {
      // Stop game
      setRunning(false);
      Alert.alert('Game Over', `You earned a discount of ${discount.toFixed(2)}%.`);
    } else {
      // Start game
      setCountdown(0);
      setDiscount(0);
      setKiteLost(false);
      setRunning(true);
      kitePosition.setValue({ x: 20, y: 700 }); // Reset kite to bottom-left
    }
  };

  const startKiteCrashAnimation = () => {
    Animated.timing(kitePosition, {
      toValue: { x: kitePosition.x._value + 50, y: kitePosition.y._value - 100 }, // Simulate crash
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  if (!fontsLoaded) {
    return null; // Render nothing while fonts are loading
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <ImageBackground
          source={require('/Users/kashchitbikramthapa/Desktop/88488/frontend/assets/images/background.png')}
          style={styles.background}
        >
          {/* Title */}
          <Text style={styles.title}>Changa Chet</Text>

          {/* Timer (bottom-left) */}
          <Text style={[styles.statText, styles.timer]}>
            Time: {countdown.toFixed(2)} s
          </Text>

          {/* Discount (bottom-right) */}
          <Text style={[styles.statText, styles.discount]}>
            Discount: {discount.toFixed(2)}%
          </Text>

          {/* Kite animation */}
          <Animated.View style={[styles.kite, kitePosition.getLayout()]}>
            <Image
              source={require('/Users/kashchitbikramthapa/Desktop/88488/frontend/assets/images/kite.png')}
              style={styles.kiteImage}
            />
          </Animated.View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 50,
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'MarioWorld',
    color: '#FF0000',
    textAlign: 'center',
    width: '100%',
  },
  statText: {
    position: 'absolute',
    color: '#000', // Change text color to black for better contrast
    fontSize: 20, // Smaller font for stats
    fontWeight: 'bold',
    backgroundColor: '#FFFAE5', // Light beige/yellow background
    paddingHorizontal: 15, // Add horizontal padding
    paddingVertical: 5, // Add vertical padding
    borderRadius: 20, // Make the container pill-shaped
    overflow: 'hidden', // Ensure the pill shape
  },
  timer: {
    bottom: 20,
    left: 20,
  },
  discount: {
    bottom: 20,
    right: 20,
  },
  kite: {
    position: 'absolute',
  },
  kiteImage: {
    width: 80,
    height: 80,
  },
});

export default KiteGameScreen;