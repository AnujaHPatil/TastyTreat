import React, { useState, useCallback , useContext} from 'react';
import { Alert, Image, View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView, FlatList, TextInput } from 'react-native';
import { FontFamily, Color } from "../../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../../AppContext'; 

const DessertPage = React.memo(({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { cart, setCart } = useContext(AppContext);
  const [totalBill, setTotalBill] = useState(0);
  const [noItemsHere, setNoItemsHere] = useState(false);

  const data = [
    { 
      id: 141, 
      name: 'Bhel',
      hotelName: 'Food Court',  
      price: 55, 
      isVeg: true, 
      image: require("../assets/bhel.png") 
    },
    { 
      id: 142, 
      name: 'Dahi Batata Puri',
      hotelName: 'Food Court',  
      price: 70, 
      isVeg: true, 
      image: require("../assets/Dahi-Puri.jpg") 
    },
    { 
      id: 143, 
      name: 'Paani Puri', 
      hotelName: 'Food Court', 
      price: 50, 
      isVeg: true, 
      image: require("../assets/Pani-Puri.jpg") 
    },
    { 
      id: 144, 
      name: 'Ragada Puri ',
      hotelName: 'Food Court',  
      price: 60, 
      isVeg: true, 
      image: require("../assets/Ragda-Patties.jpg") 
    },
    { 
      id: 145, 
      name: 'Samosa Cone', 
      hotelName: 'Food Court', 
      price: 50, 
      isVeg: true, 
      image: require("../assets/bhaji-cone.jpg") 
    },
  ]

  const handleSearch = () => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);

    if (results.length === 0) {
      setNoItemsHere(true); // Display "No items here"
    } else {
      setNoItemsHere(false); // Reset if results are found
    }
  };

  const DishItem = ({ item }) => {
    const [quantity, setQuantity] = useState(0);

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
      <View style={styles.restaurantItem}>
        <View style={styles.itemContainer}>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.hotelName}>{item.hotelName}</Text>
            <Text style={styles.price}>₹ {item.price}</Text>
          </View>
          {item.isVeg ? (
            <Ionicons name="leaf" size={24} color="green" style={styles.vegIcon} />
          ) : (
            <MaterialCommunityIcons name="hamburger" size={24} color="red" style={styles.nonVegIcon} />
          )}
          <Image source={item.image} style={styles.itemImage} />
        </View>
        
          <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        
        
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />
      <View style={styles.innercontainer}>
        <View style={styles.dosa}>
        <Image
          style={styles.dosaicon}
          contentFit="cover"
          source={require("../assets/sandwich-1.png")}
        />
        </View>

        <TextInput
          placeholder="Search Chat items here..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          Ionicons name="search" size={20} color="black" 
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

          {noItemsHere ? ( 
          <View style={styles.noItemsContainer}>
            <Text style={styles.noItemsText}>No items here</Text>
          </View>
        ) : (
          <View style={styles.innercontainer2}>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => <DishItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
          </View>
        )}

      </View>

      {/* Taskbar */}
      <View style={styles.taskbar}>
        <Pressable onPress={() => navigation.navigate('HomePage')}>
          <Ionicons name="home" size={24} color="gray" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SearchScreenDishes')}>
          <Ionicons name="search" size={24} color="rgba(0, 40, 255, 0.8)" />
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
    justifyContent: 'center',
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.colorWhite,
  },
  innercontainer: {
    flexGrow: 1,
    backgroundColor: Color.colorWhite,    
  },
  innercontainer2: {
    flex: 1,    
    marginBottom:30,
  },
  searchInput: {
    marginBottom: 10,
    marginTop: 120,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    // fontFamily: FontFamily.OutfitVariableFont_wght,
    backgroundColor: Color.colorGainsboro,
    height:40,
  },
  searchButton: {
    marginBottom:10,
    backgroundColor: "rgba(0, 40, 255, 0.8)",
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    // fontFamily: FontFamily.OutfitVariableFont_wght,
  },
  restaurantItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  dosaicon:{
    marginTop:12,
    marginBottom:0,
    marginLeft:-20,
    width: 396,
    height: 100,
    position: "absolute",
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
  restaurantItem: {
    height:150,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f0f0f0', // Faint gray color
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 28,
    marginBottom:15,
    fontWeight: '500',
  },
  hotelName: {
    fontSize: 19,
    marginBottom:10,
    color: 'black',
    fontWeight: '400',
  },
  price: {
    fontSize: 16,
  },
  vegIcon: {
    marginTop:90,
    marginRight: 10,
  },
  nonVegIcon: {
    marginTop:90,
    marginRight: 10,
  },
  itemImage: {
    width: 125,
    height: 99,
    borderRadius:20,
    marginTop:10,
  },
  addButton: {
    backgroundColor: 'rgba(0, 40, 255, 0.9)',
    padding: 8,
    borderRadius: 5,
    marginTop: -18,
    borderWidth:1,
    borderColor: 'rgba(80, 70, 200, 1)',
    width:75,
    marginLeft:235,
    height:33,
  },
  addButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 20,
    color: 'gray',
  },
});

export default DessertPage;

