import React, { useState, useEffect, useRef, useContext } from 'react';
import { Image, View,Keyboard, Pressable, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ScrollView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color, FontFamily } from '../../GlobalStyles';
import { StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../../AppContext';

const Vivek = React.memo(({ navigation }) => {
  const { cart, setCart } = useContext(AppContext);
  const [totalBill, setTotalBill] = useState(0);
  const [category, setCategory] = useState('snacks');
  const scrollViewRef = useRef(null);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState();

  const [snacksData, setSnacksData] = useState([
    { 
      id: 71, 
      name: 'Chiken Roll', 
      hotelName: 'Vivek Veg/Non-veg',
      price: 90, 
      isVeg: false, 
      image: require("../assets/finger-chips.png") 
    },
    { 
      id: 72, 
      name: 'Amul Pav  Bhaji',
      hotelName: 'Vivek Veg/Non-veg', 
      price: 80, 
      isVeg: false, 
      image: require("../assets/pavbhaji.png") 
    },
    { 
      id: 73, 
      name: 'Puri Bhaji',
      hotelName: 'Vivek Veg/Non-veg', 
      price: 85, 
      isVeg: false, 
      image: require("../assets/puribhaji.png") 
    },
    { 
      id: 74, 
      name: 'Vegetable Cutlet', 
      hotelName: 'Vivek Veg/Non-veg',
      price: 70.05, 
      isVeg: true, 
      image: require("../assets/veg-cutlet.png") 
    },
    { 
      id: 75, 
      name: 'Batata Vada',
      hotelName: 'Vivek Veg/Non-veg', 
      price: 55, 
      isVeg: true, 
      image: require("../assets/batata-wada.png") 
    },
    
    
  ]);

  const [lunchData, setLunchData] = useState([
    { 
      id: 81, 
      name: 'Butter Garlic Nan', 
      hotelName: 'Vivek Veg/Non-veg',
      price: 75, 
      isVeg: true, 
      image: require("../assets/Garlic-nan-4.jpeg") 
    },
    { 
      id: 82, 
      name: 'Mutton thali ', 
      hotelName: 'Vivek Veg/NonVeg',
      price: 220, 
      isVeg: false, 
      image: require("../assets/thali12.webp") 
    },
    { 
      id: 83, 
      name: 'Paneer Butter Masala', 
      hotelName: 'Vivek Veg/Non-veg',
      price: 260, 
      isVeg: false, 
      image: require("../assets/paneer-butter-masala.jpg") 
    },
    { 
      id: 84, 
      name: 'Malai Kofta ',
      hotelName: 'Vivek Veg/Non-veg', 
      price: 250, 
      isVeg: true, 
      image: require("../assets/malai-kofta.jpeg") 
    },
    { 
      id: 85, 
      name: 'Vegetable Fried Rice',
      hotelName: 'Vivek Veg/Non-veg', 
      price: 215, 
      isVeg: false, 
      image: require("../assets/vegetable-fried-rice.jpg") 
    },
  ]);

  const [dinnerData, setDinnerData] = useState([
    { 
      id: 91, 
      name: 'Butter Garlic Nan', 
      hotelName: 'Vivek Veg/Non-veg',
      price: 75, 
      isVeg: true, 
      image: require("../assets/Garlic-nan-4.jpeg") 
    },
    { 
      id: 92, 
      name: 'Mutton thali ', 
      hotelName: 'Vivek Veg/NonVeg',
      price: 220, 
      isVeg: false, 
      image: require("../assets/thali12.webp") 
    },
    { 
      id: 93, 
      name: 'Paneer Butter Masala', 
      hotelName: 'Vivek Veg/Non-veg',
      price: 260, 
      isVeg: false, 
      image: require("../assets/paneer-butter-masala.jpg") 
    },
    { 
      id: 94, 
      name: 'Malai Kofta ',
      hotelName: 'Vivek Veg/Non-veg', 
      price: 250, 
      isVeg: false, 
      image: require("../assets/malai-kofta.jpeg") 
    },
    { 
      id: 95, 
      name: 'Vegetable Fried Rice', 
      hotelName: 'Vivek Veg/Non-veg',
      price: 215, 
      isVeg: true, 
      image: require("../assets/vegetable-fried-rice.jpg") 
    },
  ]);

  

  const handleCategoryChange = (category) => {
    setCategory(category);
    // Scroll to the selected category
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, x: category === 'snacks' ? 0 : category === 'lunch' ? 120 : 240, animated: true });
    }
  };

  const renderCategoryData = () => {
    switch (category) {
      case 'snacks':
        return snacksData.map(item => renderDataItem(item));
      case 'lunch':
        return lunchData.map(item => renderDataItem(item));
      case 'dinner':
        return dinnerData.map(item => renderDataItem(item));
      default:
        return null;
    }
  };

  const renderDataItem = (item) => (
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
      <Text style={styles.itemPrice}>₹ {item.price}</Text>
      <TouchableOpacity onPress={() => handleAddToFavourite(item, category )} style={styles.favoriteButton}>
        <Ionicons
          name={item.isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={item.isFavorite ? 'red' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addButton}>
          <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddToFavourite = (item, dataType) => {
    // Toggle the favorite status of the item
    let updatedData;
    switch (dataType) {
      case 'snacks':
        updatedData = snacksData.map((dataItem) =>
          dataItem.id === item.id ? { ...dataItem, isFavorite: !dataItem.isFavorite } : dataItem
        );
        addToFavorites(item);
        setSnacksData(updatedData);
        break;
      case 'lunch':
        updatedData = lunchData.map((dataItem) =>
          dataItem.id === item.id ? { ...dataItem, isFavorite: !dataItem.isFavorite } : dataItem
        );
        addToFavorites(item);
        setLunchData(updatedData);
        break;
      case 'dinner':
        updatedData = dinnerData.map((dataItem) =>
          dataItem.id === item.id ? { ...dataItem, isFavorite: !dataItem.isFavorite } : dataItem
        );
        addToFavorites(item);
        setDinnerData(updatedData);
        break;
      default:
        break;
    }
    Alert.alert('Favorite Status Changed',`${item.name} added to your favorites!`);
  };

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
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />

      <View style={styles.innercontainer}>
      {/* Upper Part */}
      <View style={styles.upperContainer}>
        <View style={styles.grayBox}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={30} color="rgba(0, 40, 255, 1)" />
          </TouchableOpacity>
          <View style={styles.whiteBox}>
            <Text style={styles.title}>Vivek Hotel Nonveg</Text>
            <Text style={styles.content}>Snacks, Lunch, Dinner</Text>

            <View style={styles.rowcontent}>
              <Text style={styles.content1}>Ratnagiri </Text>
              <Text style={styles.content2}>Delivery by TastyTreat</Text>
              </View>
              {/* Divider */}
            <View style={styles.divider} />

            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                <MaterialCommunityIcons name="star" size={20} style={styles.ratingstar} color="rgba(10, 150, 255, 0.8)" />
                <Text style={styles.ratingText}>4.0</Text>
              </View>
              <View style={styles.rating}>
                <MaterialCommunityIcons name="star" size={20} style={styles.ratingstar} color="rgba(10, 150, 255, 0.8)" />
                <Text style={styles.ratingText}>4.0</Text>
              </View>
              <View style={styles.rating}>
                <MaterialCommunityIcons name="truck-delivery" size={20} style={styles.ratingstar} color="rgba(10, 150, 255, 0.8)" />
                <Text style={styles.ratingText}>40 Mins</Text>
              </View>
            </View>

            <View style={styles.ratingContainer2}>
                <Text style={styles.ratingText}>Food</Text>
                <Text style={styles.ratingText}>Packaging</Text>
                <Text style={styles.ratingText}>Delivery Time</Text>
            </View>

          </View>
        </View>
      </View>

      {/* Category selection */}
      <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => handleCategoryChange('snacks')}>
            <Text style={[styles.heading, category === 'snacks' && styles.selectedCategory]}>Snacks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryChange('lunch')}>
            <Text style={[styles.heading, category === 'lunch' && styles.selectedCategory]}>Lunch</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryChange('dinner')}>
            <Text style={[styles.heading, category === 'dinner' && styles.selectedCategory]}>Dinner</Text>
          </TouchableOpacity>
          {/* Blue line indicator */}
          <View style={[styles.blueLine, { marginLeft: category === 'snacks' ? 0 : category === 'lunch' ? 120 : 240 }]} />
        </View>

       {/* Display data based on category */}
       <ScrollView
          style={styles.dataContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
        >
          {renderCategoryData()}
        </ScrollView>

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
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.colorWhite,
  },
  innercontainer:{
    backgroundColor: Color.colorWhite,
  },
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  grayBox: {
    backgroundColor: "rgba(10, 150, 255, 0.7)",
    padding: 15,
    borderBottomLeftRadius:50,
    borderBottomRightRadius: 50,
    height:260,
    width: 350,
  },
  whiteBox: {
    backgroundColor: 'white',
    padding: 10,
    marginTop:20,
    borderRadius: 20,
    height:200,
    width:320,
  },
  backButton: {
    position: 'absolute',
    marginLeft:5,
    marginTop:5,
  },
  title: {
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 10,
  },
  content:{
    fontSize: 18,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row', 
    marginLeft: 0,
    justifyContent: 'space-between',
  },
  ratingContainer2: {
    flexDirection: 'row',
    marginLeft: 5,
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    marginRight: 10, 
  },
  ratingText: {
    fontSize: 16,
    flexDirection: 'row',
    marginLeft: 3,
    padding:5, 
  },
  divider: {
    borderBottomColor: "rgba(10, 150, 255, 0.9)",
    borderBottomWidth: 1,
    marginBottom: 10,
    margintop:8,
    borderStyle: 'dotted',
  },
  rowcontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:5,
  },
  content1:{
    fontSize: 17,
    marginBottom: 5,
  },
  content2:{
    fontSize: 17,
    marginBottom: 5,
    color: "rgba(10, 150, 255, 0.9)",
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  heading: {
    fontWeight: '500',
    fontSize: 20,
    marginBottom:10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15,
  },
  itemName: {
    fontSize: 21 ,
    marginLeft: 10,
    fontWeight:'600',
  },
  itemImage: {
    width: 125,
    height: 99,
    borderRadius:20,
    marginTop:5,
    marginLeft:7,
  },
  itemPrice: {
    fontSize: 18,
    marginTop:10,
    marginLeft:10,
    // marginBottom:10,
  },
  grayBox2:{
    marginBottom: 200,
    paddingHorizontal: 10,
    paddingVertical:10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "rgba(10, 150, 255, 0.15)", 
    marginRight:20,
    height:260,
    width:162,
    marginTop:10,
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
    backgroundColor: 'rgba(10, 170, 255, 0.8)',
    padding: 8,
    borderRadius: 5,
    marginTop: 215,
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
  blueLine: {
    width: 80,
    height: 2.5,
    borderRadius:10,
    backgroundColor: "rgba(0, 40, 255, 0.9)",
    position: 'absolute',
    bottom: 0,
  },
  dataContainer: {
    // flex: 1,
    marginTop: 10, // Adjust as needed
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
    bottom: -10, // Fix the Taskbar at the bottom of the container
    left: -20, // Align the Taskbar to the left edge
    right: -20, // Align the Taskbar to the right edge
    backgroundColor: 'white', // Adjust as needed
  },
  favoriteButton: {
    position: 'absolute',
    marginTop:217,
    marginLeft:115,
    zIndex: 1,
  },
});

export default Vivek;
