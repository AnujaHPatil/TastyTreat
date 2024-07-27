import React, {  useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'react-native';
import { FontSize, Border, Color } from '../../GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import { firebaseConfig, app, auth, db } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

const SignupPage = ({ navigation }) => {
  console.log('Inside SignupPage component');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');

  const handleSignup = async () => {
    if (name === '' || email === '' || password === '' || address === '') {
      Alert.alert('Invalid Details', 'Please enter all the credentials');
      return;
    }
  
    if (password.length < 6) {
      Alert.alert('Password Error', 'Password must be at least 6 characters long.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential._tokenResponse.email;
      const uid = auth.currentUser.uid;
  
      await setDoc(doc(db, 'users', uid), {
        email: user,
        name: name,
        address: address,
      });
  
      Alert.alert('Success', 'Registration successful', [{ text: 'OK' }], { cancelable: false });
      navigation.navigate('LoginPage');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Email Error', 'The provided email is already in use. Please use a different email.');
      } else {
        Alert.alert('Signup Error', error.message);
      }
      console.error('Error signing up:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />
      <ScrollView>

      <View style={styles.innerContainer}>
      <View style={styles.rice}>
          <Image
            style={styles.rice1Icon}
            contentFit="cover"
            source={require('../assets/thali123.png')}
          />
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="rgba(0, 40, 255, 0.8)" />
      </TouchableOpacity>

      <Text style={styles.header}>Create your account</Text>
        <Text style={styles.label}>Enter your name</Text>
        <TextInput
          label="Name"
          placeholder="Name"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          style={styles.input}
        />
        <Text style={styles.label}>Enter Email</Text>
        <TextInput
          label="Email"
          placeholder="Email"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          style={styles.input}
        />
        <Text style={styles.label}>Enter Password</Text>
        <TextInput
          label="Password"
          placeholder="at least 6 character long"
          returnKeyType="done"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.label}>Enter your Address</Text>
        <TextInput
          label="mobile no."
          value={address}
          onChangeText= {setAddress}
          placeholder="enter your delivery address"
          style={styles.input}
        />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.link}>Already have an account?</Text>
      </TouchableOpacity>

      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 20,
    backgroundColor: Color.colorWhite,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft:5,
    marginRight:10,
    backgroundColor: Color.colorWhite,
  },
  backButton: {
    position: 'relative',
    margin:15,
    marginBottom:140,
  },
  rice1Icon: {
    marginTop: -45,
    margin:5,
    left: 165,
    borderRadius: Border.br_81xl,
    width: 258,
    height: 259,
    position: 'absolute',
  },
  header: {
    fontSize: 32,
    marginBottom: 50,
    color: "rgba(0, 40, 255, 0.8)",
    textAlign: 'center',
  },
  label: {
    marginBottom: 5,
    left: 20,
    fontSize: FontSize.size_xl,
  },
  input: {
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    width: '88%',
    borderRadius: 8,
    left: 20,
  },
  link: {
    marginTop: 20,
    marginLeft: 120,
    color: Color.c,
    fontSize: FontSize.size_sm,
    color:'rgba(0, 40, 255, 0.8)',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  signupButton: {
    width: 140,
    height: 50,
    left: 120,
    backgroundColor: "rgba(0, 40, 255, 0.8)",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default SignupPage;



