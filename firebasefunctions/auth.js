import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { signInAnonymously } from 'firebase/auth'; // Import signInAnonymously function from your firebase.js file



const Auth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSignInAnonymously = async () => {
    try {
      const userCredential = await signInAnonymously();
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      setError('Failed to sign in anonymously. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <Text>Welcome, {user.uid}!</Text>
      ) : (
        <>
          <Button title="Sign In Anonymously" onPress={handleSignInAnonymously} />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </>
      )}
    </View>
  );
};




export default Auth;
