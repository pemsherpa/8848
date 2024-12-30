// ChatbotScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import cohere from 'cohere-ai';

cohere.init('5b323298669f37f563776f39657b6a97');

const ChatbotScreen = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const restaurantContacts = [
    { name: 'Pizza Palace', number: '123-456-7890' },
    { name: 'Burger Bistro', number: '987-654-3210' },
    { name: 'Sushi Spot', number: '555-333-2222' },
    { name: 'Pasta Place', number: '444-222-1111' },
  ];

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    setChatLog((prev) => [...prev, { sender: 'User', message: userMessage }]);

    let responseMessage = '';

    const isComplaint = userMessage.toLowerCase().includes('complain') || userMessage.toLowerCase().includes('bad');
    if (isComplaint) {
      const randomRestaurant = restaurantContacts[Math.floor(Math.random() * restaurantContacts.length)];
      responseMessage = `We're sorry to hear that! Please contact ${randomRestaurant.name} at ${randomRestaurant.number} for assistance.`;
    } else {
      try {
        const cohereResponse = await cohere.generate({
          model: 'command-xlarge-2021-09',
          prompt: `You are a helpful chef AI. Answer only food-related questions. If the question is unrelated to food, respond with "Sorry, I am a chef. ONLY FOOD QUESTIONS." \n\nUser: ${userMessage}\nAI:`,
          temperature: 0.8,
        });
        responseMessage =
          cohereResponse.body.generations[0].text.trim() || 'Sorry, I am a chef. ONLY FOOD QUESTIONS.';
      } catch (error) {
        responseMessage = 'Sorry, something went wrong. Please try again.';
      }
    }

    setChatLog((prev) => [...prev, { sender: 'AI', message: responseMessage }]);
    setUserMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatLog}
        renderItem={({ item }) => (
          <Text style={item.sender === 'User' ? styles.userMessage : styles.aiMessage}>
            {item.sender}: {item.message}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Type your message here..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e9ecef',
    color: 'black',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ChatbotScreen;
