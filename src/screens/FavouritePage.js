import React, { useState,  useEffect, useContext } from 'react';
import { Image, View,Keyboard, Pressable, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ScrollView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { FontFamily, Color, FontSize, Border } from "../../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../../AppContext';


const FavouritePage=  React.memo(({ navigation}) => {
  const { cart, setCart } = useContext(AppContext);
    const [totalBill, setTotalBill] = useState(0);
    const [isFavorite, setIsFavorite] = useState();
    const { favorites, addToFavorites, removeFromFavorites } = useContext(AppContext);

  const renderDataItem = ({ item }) => { 

    const handleAddToCart = (item) => {
      if (cart.length > 0) {
        const currentHotelName = item.hotelName;
        const cartHotelNames = cart.map(cartItem => cartItem.hotelName);
    
        if (!cartHotelNames.includes(currentHotelName)) {
          // Prompt user to replace items in cart
          Alert.alert(
            'Replace Items',
            'Your cart includes items from a different restaurant. Do you want to replace them with this item?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK', onPress: () => replaceItemsWithNew(item) },
            ],
            { cancelable: true }
          );
          return;
        }
      }
    
      // Add item to cart and update total bill
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      const updatedTotalBill = totalBill + item.price;
      setTotalBill(updatedTotalBill);
      Alert.alert('Item added to cart', `${item.name} added to your cart!`);
    };
    
    const replaceItemsWithNew = (newItem) => {
      const updatedCart = [newItem];
      const updatedTotalBill = newItem.price;
      setCart(updatedCart);
      setTotalBill(updatedTotalBill);
      Alert.alert('Items Replaced', `${newItem.name} replaced items in your cart!`);
    };

    return (
      <View key={item.id} style={styles.grayBox2}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemContainer2}>
        
          <View style={styles.itemDetails}>
            {item.isVeg ? (
              <Ionicons name="leaf" size={24} color="green" style={styles.vegIcon} />
            ) : (
              <MaterialCommunityIcons name="hamburger" size={24} color="red" style={styles.nonVegIcon} />
            )}
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        </View>
        <Text style={styles.hotelName}>{item.hotelName}</Text>
        <Text style={styles.itemPrice}>₹ {item.price}</Text>
      
        <TouchableOpacity onPress={() => handleRemoveFromFavorites(item)} style={styles.favoriteButton}>
          <Ionicons
            name={!isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'black' : 'red'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleRemoveFromFavorites = (item) => {
    removeFromFavorites(item.id);
    Alert.alert('Favorite Status Changed', `${item.name} removed from your favorites!`);
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />
      <View style={styles.topbar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Your Favourites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Image
          style={styles.dessertIcon}
          contentFit="cover"
          source={require("../assets/dessert2.png")}
        />
          <Text style={styles.noitemstext}>No items yet...</Text>
          <Image
          style={styles.cook1Icon}
          contentFit="cover"
          source={require("../assets/cook-1.png")}
        />
      </View>        
      ) : (
        <View style={styles.favoriteContainer}>
          
          <FlatList
            data={favorites}
            renderItem={renderDataItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
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
          <Ionicons name="heart" size={24} color="rgba(0, 40, 255, 0.8)" />
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.colorWhite,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15,
  },
  itemImage: {
    width: 125,
    height: 99,
    borderRadius:20,
    marginTop:5,
    marginLeft:7,
  },
  topbar:{
    marginTop: 35,
    flexDirection: 'row',
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    marginLeft:60,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  favoriteContainer: {
    flex: 1,
    marginBottom:30,
  },
  emptyCartContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  dessertIcon: {
    marginTop:170,
    marginBottom:50,
    marginLeft:40,
    borderRadius: 430,
    width: 284,
    height: 241,
    opacity: 0.9,
    position: "absolute",
  },
  noitemstext:{
    fontSize: 32,
    marginTop: 260,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  cook1Icon: {
    // marginBottom:20,
    marginTop:200,
    marginLeft:220,
    width: 151,
    height: 161,
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
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: 'white', 
  },
  grayBox2:{
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical:10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "rgba(30, 80, 255, 0.15)", 
    marginRight:20,
    height:270,
    width:166,
  },
  itemContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vegIcon: { 
    // marginRight: 2,
  },
  nonVegIcon: {
    // marginRight: 10,
  },
  addButton: {
    backgroundColor: 'rgba(30, 80, 255, 0.8)',
    padding: 8,
    borderRadius: 5,
    marginTop: 225,
    position:'absolute',
    width:70,
    marginLeft:20,
    height:33,
    // marginBottom:.15,
  },
  addButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
  },
  favoriteButton: {
    position: 'absolute',
    marginTop:227,
    marginLeft:115,
    zIndex: 1,
  },
  itemPrice: {
    fontSize: 18,
    marginTop:10,
    marginLeft:10,
    // marginBottom:10,
  },
  itemName: {
    fontSize: 19 ,
    marginLeft: 5,
    fontWeight:'bold',
    
  },
  hotelName:{
    fontSize:18,
    marginTop:10,
    marginLeft:10,
    
  },
});

export default FavouritePage;

