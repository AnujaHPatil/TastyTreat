import React, { useContext, useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, FlatList, Image, Pressable, TouchableOpacity } from 'react-native';
import { FontFamily, Color, FontSize, Border } from "../../GlobalStyles";
import { AppContext } from '../../AppContext';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, doc, deleteDoc, query } from 'firebase/firestore';
import { firebaseConfig, app, auth, db  } from '../../firebase';

const YourOrders = React.memo(({ navigation }) => {
  const { confirmedOrders } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const user = auth.currentUser;
  

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user) {
        const userId = user.uid;
        const userOrdersRef = collection(db, `users/${userId}/orders`);

        try {
          const querySnapshot = await getDocs(userOrdersRef);
          const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching user orders:', error.message);
          // Handle the error, such as displaying an error message to the user
        }
      }
    };

    fetchUserOrders();
  }, [user]);
  

  

  const handleDeleteOrder = async (orderId) => {
    try {
      const orderDocRef = doc(db, 'orders', orderId);
      await deleteDoc(orderDocRef);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const confirmDeleteOrder = (orderId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to cancel this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => handleDeleteOrder(orderId) },
      ],
      { cancelable: true }
    );
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderHeader}>Order Details</Text>
      <Text style={styles.orderText}>Username: {item.username}</Text>
      <Text style={styles.orderText}>Delivery Address: {item.address}</Text>
      <Text style={styles.orderText}>Item Name: {item.itemName}</Text>
      <Text style={styles.orderText}>Item Quantity: {item.itemQuantity}</Text>
      <Text style={styles.orderText}>Total Bill: ₹ {item.totalBill}</Text>
      <Text style={styles.orderText}>Hotel Name: {item.hotelName}</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={[styles.optionItem, styles.square]} onPress={() => confirmDeleteOrder(item.id)}>
            <Ionicons name="trash" size={20} color="rgba(10, 150, 255, 1)" />
            <Text style={styles.optionText}>Cancel Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="rgba(10, 150, 255, 1)" />
        </TouchableOpacity>
        <Text style={styles.header}>Your Orders</Text>
      </View>
      

      {/* Orders */}
      {orders.length === 0 ? (
       <View style={styles.emptyCartContainer}>
        <Image
          style={styles.noodlesIcon}
          source={require("../assets/panjabi-thali10.png")}
        />
       <Text style={styles.noitemstext}>No items yet</Text>
     </View>
      ) : (
        <View style={styles.innercontainer2}>
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={item => item.id}
        />
        </View>
      )}

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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  topbar:{
    marginTop: 35,
    flexDirection: 'row',
  },
  header: {
    fontSize: 30,
    marginLeft:80,
    marginBottom:20,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  noodlesIcon: {
    marginBottom: 50,
    marginLeft: 70,
    width: 250,
    height: 150,
    opacity: 0.55,
    position: "absolute",
  },
  noitemstext: {
    fontSize: 25,
    marginBottom: 280,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  orderHeader:{
    fontSize:20,
    fontWeight:'500',
    textAlign:'center',
    marginBottom:15,
  },
  innercontainer2: {
    flex: 1,    
    marginBottom:25,
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    backgroundColor:'#f0f0f0',
    padding: 10,
    marginBottom: 20,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 7,
  },
  optionsContainer: {
   
    justifyContent: 'space-between',
    marginTop:20,
    marginBottom:10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  square: {
    width: 320, 
    height:40,
    backgroundColor:'rgba(10, 150, 255, 0.25)', 
    borderRadius: 8,
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionItem: {
    flexDirection: 'row',
  },
  optionText:{
    fontSize:18,
    fontWeight:'500',
    marginLeft:5,
  },
});

export default YourOrders;
