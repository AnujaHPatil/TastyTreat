import React, { useState, useEffect } from 'react';
import { View, Alert,Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color, FontFamily } from '../../GlobalStyles';
import { StatusBar } from 'react-native';
import { firebaseConfig, app, auth, db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { signOut, deleteUser } from 'firebase/auth';

const UserAccountPage = ({ navigation }) => {
  const user = auth.currentUser;
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const signOutUser = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            signOut(auth)
              .then(() => {
                navigation.navigate("LoginPage");
              })
              .catch((error) => {
                Alert.alert('Error', 'Could not Log out. Try again later.');
                console.error('Error signing out:', error);
              });
          },
        },
      ]
    );
  };

    const deleteUserAccount = () => {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? ',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              deleteUser(auth.currentUser)
                .then(() => {
                  navigation.navigate("SignupPage"); // Redirect to signup page
                })
                .catch((error) => {
                  Alert.alert('Error', 'Could not delete account. Try again later.');
                  console.error('Error deleting account:', error);
                });
            },
          },
        ]
      );
    };
  

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userId = auth.currentUser.uid; // Replace 'your_user_id' with the actual user ID or fetch it from authentication
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name);
            setUserAddress(userData.address);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    // Rest of the component code
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />

      {/* Topbar */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="rgba(10, 150, 255, 1)" />
        </TouchableOpacity>
        <Text style={styles.header}>Your Account </Text>
      </View>

      {/* User Information */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>Name : {userName}</Text>
        <Text style={styles.userEmail}>Email : {user.email}</Text>
        <Text style={styles.userAddress}>Address : {userAddress}</Text>
      </View>

      <View style={styles.optionsContainer1}>
        <Pressable style={[styles.optionItem, styles.square]} onPress={() => signOutUser()}>
          <Ionicons name="log-out" size={24} color="rgba(10, 150, 255, 1)" />
          <Text style={styles.optionText}>Logout</Text>
        </Pressable>
        <Pressable style={[styles.optionItem, styles.square]} onPress={deleteUserAccount}>
          <Ionicons name="trash" size={24} color="rgba(10, 150, 255, 1)" />
          <Text style={styles.optionText}>Delete Account</Text>
        </Pressable>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer2}>
        <Pressable style={[styles.optionItem, styles.square]} onPress={() => navigation.navigate('ContactUsPage')}>
          <Ionicons name="call" size={24} color="rgba(10, 150, 255, 1)" />
          <Text style={styles.optionText}>Contact Us</Text>
        </Pressable>
        <Pressable style={[styles.optionItem, styles.square]} onPress={() => navigation.navigate('AboutUsPage')}>
          <Ionicons name="information-circle" size={24} color="rgba(10, 150, 255, 1)" />
          <Text style={styles.optionText}>About Us</Text>
        </Pressable>
      </View>

      {/* Taskbar */}
      <View style={styles.taskbar}>
        <Pressable onPress={() => navigation.navigate('HomePage')}>
          <Ionicons name="home" size={24} color="gray" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SearchScreenDishes')}>
          <Ionicons name="search" size={24} color="gray" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('CartPage')}>
          <Ionicons name="cart" size={24} color="gray" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('FavouritePage')}>
          <Ionicons name="heart" size={24} color="gray" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.colorWhite,
  },
  topbar:{
    marginTop: 35,
    flexDirection: 'row',
  },
  header: {
    fontSize: 30,
    marginLeft:80,
    marginBottom:30,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  userInfoContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth:1,
    borderRadius:12,
    padding:15,
    backgroundColor:'rgba(10, 150, 255, 0.3)',
    borderColor: 'rgba(10, 150, 255, 0.7)',
  },
  userEmail: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 15,
    color: Color.colorBlack,
    fontWeight:'500',
  },
  userName: {
    fontSize: 20,
    marginTop: 10,
    marginBottom:15,
    color: Color.colorBlack,
    fontWeight:'500',
  },
  userAddress: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 15,
    color: Color.colorBlack,
    fontWeight:'500',
  },
  optionsContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 2,
    marginTop:20,
    marginBottom:10,
  },
  optionsContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop:10,
    marginBottom:50,
  },
  square: {
    width: 165, 
    height:40,
    backgroundColor:'rgba(10, 150, 255, 0.25)', 
    borderRadius: 8,
    padding:5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth:1,
    borderColor: 'rgba(10, 150, 255, 0.7)',
  },
  optionItem: {
    flexDirection: 'row',
  },
  optionText: {
    marginLeft: 5,
    fontSize: 16,
    color: Color.colorBlack,
  },
  taskbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Color.colorGray_200,
    paddingTop: 15,
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 0, // Fix the Taskbar at the bottom of the container
    left: 0, // Align the Taskbar to the left edge
    right: 0, // Align the Taskbar to the right edge
    backgroundColor: 'white', // Adjust as needed
  },
});

export default UserAccountPage;









