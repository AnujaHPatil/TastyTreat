import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { FontFamily, Color, FontSize, Border } from "../../GlobalStyles";
import { StatusBar } from 'react-native';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRoute } from '@react-navigation/native';

const LoginPage = ({ navigation }) => {
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (route.params?.registrationSuccess) {
      Alert.alert('Registration Success', 'You have successfully registered. Please login with your credentials.');
    }
  }, [route.params?.registrationSuccess]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user details", user);
      setUserData(user);
      navigation.navigate('HomePage'); 
    } catch (error) {
      console.error('Error signing in:', error.message);
      Alert.alert('Login Failed',`Invalid email or password. Please try again.`);
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
              source={require("../assets/thali123.png")}
            />
          </View>
          <Text style={styles.header}>Login to Your Account</Text>
          {loginError && <Text style={styles.error}>{loginError}</Text>}
          <Text style={styles.label}>Enter Email</Text>
          <TextInput
            label="Email"
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
            returnKeyType="done"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.input}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')} >
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.userData}>
            {userData ? `Logged in as ${userData.email}` : ''}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
            <Text style={styles.link}>Don't have an account yet?</Text>
            <Text style={styles.link}>Create an Account!</Text>
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
  rice1Icon: {
    marginTop: -45,
    left: 165,
    borderRadius: Border.br_81xl,
    width: 258,
    height: 259,
    position: "absolute",
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 10,
  },
  header: {
    fontSize: 34,
    marginBottom: 40,
    marginTop: 230,
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
  loginButton: {
    width: 140,
    height: 50,
    left: 115,
    backgroundColor: "rgba(0, 40, 255, 0.8)",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  forgotText: {
    fontSize: 16,
    color:'green',
    marginLeft:230,
    marginBottom:20,
    fontWeight:'500',
  },
  link: {
    marginTop: 10,
    color: Color.colorBlack,
    fontSize: FontSize.size_sm,
    textAlign: 'center',
    color:'rgba(0, 40, 255, 0.8)',
    textDecorationLine: 'underline',
  },
  userData: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
});

export default LoginPage;

