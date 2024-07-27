import React, { useContext, useState, useEffect } from 'react';
import { Pressable, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AppContext } from '../../AppContext';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { firebaseConfig, app, auth, db } from '../../firebase';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { Color, FontFamily, FontSize, Border } from '../../GlobalStyles';
import { collection, addDoc } from 'firebase/firestore';


const PlaceOrder = ({ navigation }) => {
  const user = auth.currentUser;
  const route = useRoute();
  const { cart, addOrder, setCart, selectedDeliveryOption, specialInstructions, setConfirmedOrders,confirmedOrders } = useContext(AppContext);
  const [address, setAddress] = useState('');
  const { totalBill, itemCount } = route.params;
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
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

  const handleUpdateAddress = async () => {
    if (address.trim() === '') {
      Alert.alert('Error', 'Please enter your delivery address.');
      return;
    }
  
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          ...userDocSnapshot.data(),
          address: address,
        });
        setUserAddress(address); // Update the local state with the new address
        setIsEditingAddress(false);
        Alert.alert('Success', 'Your address has been updated successfully.');
      } else {
        await setDoc(userDocRef, {
          address: address,
        });
        setUserAddress(address); // Update the local state with the new address
        setIsEditingAddress(false);
        Alert.alert('Success', 'Your address has been updated successfully.');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      Alert.alert('Error', 'An error occurred while updating your address. Please try again.');
    }
  };
  
  const handleConfirmOrder = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const existingAddress = userDocSnapshot.data().address;
        const deliveryMessage = `Your order will be delivered to ${existingAddress}`;
  
        Alert.alert('Order Placed', deliveryMessage, [
          { text: 'OK', onPress: () => navigation.navigate('YourOrders') }
        ]);
  
        // Create an order object with necessary data
        const order = {
          username: userName,
          address: existingAddress,
          itemName: cart.map(item => item.name).join(', '), // Concatenate item names if multiple items
          itemQuantity: itemCount, // Calculate total item quantity
          totalBill: (totalBill),
          hotelName: cart[0].hotelName,   // Replace with actual hotel name
        };
  
        // Add the order to the user's orders collection
        const userOrdersCollectionRef = collection(db, `users/${userId}/orders`); // New collection for each user
        await addDoc(userOrdersCollectionRef, order);
  
        addOrder(order);
        setCart([]);
      } else {
        Alert.alert('Error', 'User data not found. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'An error occurred while placing your order. Please try again.');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="rgba(10, 150, 255, 1)" />
        </TouchableOpacity>
        <Text style={styles.header}>Place Your Order</Text>
      </View>
      
      <ScrollView>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeader}>Delivery to : {userName}</Text>
        <Text style={styles.subHeader}>Delivery Address :</Text>
        {isEditingAddress ? (
          <View style={styles.addressInputContainer}>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter your delivery address"
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity onPress={handleUpdateAddress}>
              <Ionicons name="checkmark" size={24} color="green" style={styles.pencilIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.addressContainer}>
            <Text style={styles.subHeader}>{userAddress}</Text>
            <TouchableOpacity onPress={() => setIsEditingAddress(true)}>
              <MaterialIcons name="edit" size={22} color="black" style={styles.pencilIcon}/>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.deliveryInfoContainer}>
          <Text style={styles.subHeader}>Special Instructions: {specialInstructions}</Text>
        </View>

      <View style={styles.dishItemContainer1}>
      <Text style={styles.subHeader1}>Items :</Text>
      {cart.map((item) => (
        <View key={item.id} style={styles.dishItemContainer}>
          <Text style={styles.itemName}>{item.hotelName}</Text>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemName}>Price: ₹ {item.price}</Text>
        </View>
      ))}
      </View>
      <Text style={styles.subHeader}>Total Bill : ₹ {totalBill}</Text>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
      </ScrollView>

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
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.colorWhite,
  },
  innercontainer2: {
    flex: 1,    
  },
  topbar:{
    marginTop: 35,
    flexDirection: 'row',
  },
  header: {
    fontSize: 30,
    marginLeft:50,
    marginBottom:30,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  addressInputContainer:{
    borderRadius:1,
    flexDirection:'row',
  },
  deliveryInfoContainer: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15,
    marginTop:10,
  },
  subHeader1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15,
  },
  subHeaderContainer: {
    borderWidth:1,
    padding:10,
    borderRadius:12,
    backgroundColor:'#f0f0f0',
  },
  itemName: {
    fontSize: 18,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom:50,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pencilIcon:{
    marginLeft:10,
    marginBottom:15,
  },
  dishItemContainer1: {
    marginBottom: 10,
  },
  dishItemContainer: {
    marginBottom: 15,
    borderWidth:1,
    padding:10,
    borderRadius:12,
    backgroundColor:'#f0f0f0',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  addressInput:{
    marginBottom:17,
  },
  taskbar: 
  {
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

export default PlaceOrder;





