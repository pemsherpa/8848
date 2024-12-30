import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated, ImageBackground, Image } from 'react-native';

const KiteGameScreen = () => {
  const [kitePosition] = useState(new Animated.Value(0)); // Start kite at the bottom left
  const [gameStarted, setGameStarted] = useState(false); // Track if the game is started
  const [kiteCut, setKiteCut] = useState(false); // Track if the kite is cut
  const [discount, setDiscount] = useState(0); // Discount multiplier
  const [cutTime, setCutTime] = useState(0); // Time at which kite will cut
  const [canSteal, setCanSteal] = useState(false); // Allow user to steal the deal

  useEffect(() => {
    if (gameStarted && !kiteCut) {
      // Randomly set the cut time for the kite (between 4-7 seconds)
      const cutTime = Math.floor(Math.random() * 3) + 4;
      setCutTime(cutTime);

      // Animate kite position (from bottom-left to top-right)
      Animated.timing(kitePosition, {
        toValue: 1,
        duration: cutTime * 1000,
        useNativeDriver: true,
      }).start();

      // After random time, cut the kite (stop animation)
      const cutTimeout = setTimeout(() => {
        setKiteCut(true); // Kite cut, stop the animation
        setCanSteal(false); // Disable stealing the discount once kite is cut
      }, cutTime * 1000);

      // Increase multiplier over time
      const multiplierInterval = setInterval(() => {
        if (!kiteCut) {
          setDiscount((prevDiscount) => prevDiscount + 5); // Increase discount by 5%
        }
      }, 1000);

      // Clean up timeouts and intervals on component unmount or game reset
      return () => {
        clearTimeout(cutTimeout);
        clearInterval(multiplierInterval);
      };
    }
  }, [gameStarted, kiteCut, kitePosition]);

  const startGame = () => {
    setGameStarted(true); // Start the game
    setKiteCut(false); // Reset kite cut status
    setDiscount(0); // Reset discount multiplier
    setCanSteal(true); // Allow user to steal the deal
  };

  const stealDeal = () => {
    if (!kiteCut && canSteal) {
      alert(`You stole the deal! You get a ${discount}% discount.`);
      setGameStarted(false); // End the game when the deal is stolen
    } else if (kiteCut) {
      alert('The kite got cut! You missed the deal.');
    } else {
      alert(`You can steal the deal! The discount is ${discount}%.`);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/background.png')} style={styles.background}>
        <View style={styles.gameContainer}>
          <Text style={styles.title}>Kite Game</Text>
          <Text>Enjoy the kite flying game!</Text>
          {gameStarted ? (
            <Text style={styles.discountText}>Discount: {discount}%</Text>
          ) : (
            <Text style={styles.discountText}>Get ready to steal a deal!</Text>
          )}
          <Animated.View
            style={[
              styles.kite,
              {
                transform: [
                  {
                    translateX: kitePosition.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 300], // X-axis (left to right movement)
                    }),
                  },
                  {
                    translateY: kitePosition.interpolate({
                      inputRange: [0, 1],
                      outputRange: [400, 0], // Y-axis (bottom to top movement)
                    }),
                  },
                ],
              },
            ]}>
            <Image source={require('../../assets/images/kite.png')} style={styles.kiteImage} />
          </Animated.View>
          {gameStarted ? (
            <>
              <Button title="Steal the Deal!" onPress={stealDeal} />
            </>
          ) : (
            <Button title="Start Game" onPress={startGame} />
          )}
          {kiteCut && !canSteal && <Text style={styles.kiteCutText}>Oops! The kite got cut!</Text>}
        </View>
      </ImageBackground>
    </View>
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
  gameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  discountText: {
    fontSize: 18,
    margin: 10,
  },
  kite: {
    position: 'absolute',
  },
  kiteImage: {
    width: 60, // Adjusted width for smaller kite
    height: 60, // Adjusted height for smaller kite
  },
  kiteCutText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default KiteGameScreen;
