import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';

const GiveFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [order, setorder] = useState('');

  const handleSubmit = () => {
    if (feedback.trim() !== '' && order.trim() !== '') {
      firebase.database().ref('Feedbacks').push({
        Ordernumber:order,
        Feedback: feedback.trim(),
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      }).then(alert('Feedback Submited'));
      setorder('');
      setFeedback('');
    }
    else{
      alert('Error Submission!')
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Give Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Order Number"
        value={order}
        onChangeText={(text) => setorder(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
      />
      
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    width: '80%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GiveFeedback;
