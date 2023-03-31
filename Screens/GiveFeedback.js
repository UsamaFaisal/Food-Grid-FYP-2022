import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Rating } from 'react-native-ratings';
import Header from '../components/Header1';
const GiveFeedback = ({route}) => {
  const { orderId } = route.params || {};
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (feedback.trim() !== '') 
    {
      firebase
      .database().ref(`Feedbacks/${orderId}`).set({
        orderId: orderId,
        Feedback: feedback.trim(),
        Rating: rating,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      }).then(() => {
        alert('Feedback Submited');
        setFeedback('');
        setRating(0);
      }).catch((error) => {
        console.error(error);
        alert('Error Submission!');
      });
    } else {
      alert('Error Submission!');
    }
  };
  if (!orderId) {
    // The orderId parameter is missing, show an error message or navigate back to the previous screen
    return (
      <View>
        <Text style={styles.title}>Invalid request</Text>
      </View>
    );
  }
  return (
    
    <View>
      <Header />
      <Text style={styles.title}>Give Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
      />
      <View style={styles.ratingContainer}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={40}
          showRating
          onFinishRating={setRating}
          style={styles.rating}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>





    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft:5,
    marginTop:15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginLeft:10,
    marginBottom: 16,
    width: '90%',
    borderRadius: 8,
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  rating: {
    marginTop: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop:15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GiveFeedback;
