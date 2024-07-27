import React, { useState, useCallback , useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Alert, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native';
import { FontFamily, Color, FontSize } from "../../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../../AppContext'; 


const SearchScreenDishes =  React.memo(({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { cart, setCart } = useContext(AppContext);
  const [totalBill, setTotalBill] = useState(0);
  const [noItemsHere, setNoItemsHere] = useState(false);

  const data = [
    { 
      id: 101, 
      name: 'Puri Bhaji', 
      hotelName: 'Mithila Only Veg', 
      price: 85, 
      isVeg: true, 
      image: require("../assets/puribhaji.png") 
    },
    { 
      id: 102, 
      name: 'Vegetable Cutlet', 
      hotelName: 'Mithila Only Veg', 
      price: 70.05, 
      isVeg: true, 
      image: require("../assets/veg-cutlet.png") 
    },
    { 
      id: 103, 
      name: 'Batata Vada', 
      hotelName: 'Mithila Only Veg', 
      price: 55, 
      isVeg: true, 
      image: require("../assets/batata-wada.png") 
    },
    { 
      id: 104, 
      name: 'Amul Pav Bhaji', 
      hotelName: 'Mithila Only Veg', 
      price: 140, 
      isVeg: true, 
      image: require("../assets/pavbhaji.png") 
    },
    { 
      id: 105, 
      name: 'Finger Chips', 
      hotelName: 'Mithila Only Veg', 
      price: 80, 
      isVeg: true, 
      image: require("../assets/finger-chips.png") 
    },
    { 
      id: 107, 
      name: 'Butter Garlic Nan', 
      hotelName: 'Mithila Only Veg', 
      price: 75, 
      isVeg: true, 
      image: require("../assets/Garlic-nan-4.jpeg") 
    },
    { 
      id: 108, 
      name: 'Veg Kolhapuri', 
      hotelName: 'Mithila Only Veg', 
      price: 260, 
      isVeg: true, 
      image: require("../assets/Veg-Kolhapuri.jpg") 
    },
    { 
      id: 109, 
      name: 'Paneer Butter Masala', 
      hotelName: 'Mithila Only Veg', 
      price: 260, 
      isVeg: true, 
      image: require("../assets/paneer-butter-masala.jpg") 
    },
    { 
      id: 110, 
      name: 'Malai Kofta ', 
      hotelName: 'Mithila Only Veg', 
      price: 250, 
      isVeg: true, 
      image: require("../assets/malai-kofta.jpeg") 
    },
    { 
      id: 111, 
      name: 'Vegetable Fried Rice', 
      hotelName: 'Mithila Only Veg', 
      price: 215, 
      isVeg: true, 
      image: require("../assets/vegetable-fried-rice.jpg") 
    },
    { 
      id: 113, 
      name: 'Methi Matar', 
      hotelName: 'Mithila Only Veg', 
      price: 215, 
      isVeg: true, 
      image: require("../assets/Methi-Matar.jpg") 
    },
    { 
      id: 114, 
      name: 'Dal Fry', 
      hotelName: 'Mithila Only Veg', 
      price: 121, 
      isVeg: true, 
      image: require("../assets/dal-fry-recipe.webp") 
    },
    { 
      id: 115, 
      name: 'Paneer Tikka Masala ', 
      hotelName: 'Mithila Only Veg', 
      price: 243, 
      isVeg: true, 
      image: require("../assets/Paneer-tikka-masala.jpg") 
    },
    { 
      id: 116, 
      name: 'Jira Rice', 
      hotelName: 'Mithila Only Veg', 
      price: 90, 
      isVeg: true, 
      image: require("../assets/jira-rice.jpg") 
    },
    { 
      id: 117, 
      name: 'Hydrabadi Biryani', 
      hotelName: 'Mithila Only Veg', 
      price: 220, 
      isVeg: true, 
      image: require("../assets/hyderabadi-vegetablebiryani.jpg") 
    },
    { 
      id: 118, 
      name: 'Cheese Pav Bhaji', 
      hotelName: 'Food Court', 
      price: 130, 
      isVeg: true, 
      image: require("../assets/jain-bhaji-pav.jpg") 
    },
    { 
      id: 119, 
      name: 'Dabeli', 
      hotelName: 'Food Court', 
      price: 20, 
      isVeg: true, 
      image: require("../assets/Kutchi-Dabeli-8.jpg") 
    },
    { 
      id: 120, 
      name: 'Pav Pattice',
      hotelName: 'Food Court',  
      price: 20, 
      isVeg: true, 
      image: require("../assets/Bread-Pattice-Insta-01.webp") 
    },
    { 
      id: 121, 
      name: 'Samosa',
      hotelName: 'Food Court',  
      price: 18, 
      isVeg: true, 
      image: require("../assets/SAMOSA.webp") 
    },
    { 
      id: 122, 
      name: 'Vada Pav', 
      hotelName: 'Food Court', 
      price: 15, 
      isVeg: true, 
      image: require("../assets/vada-pav.jpg") 
    },

    { 
      id: 123, 
      name: 'Bhel',
      hotelName: 'Food Court',  
      price: 55, 
      isVeg: true, 
      image: require("../assets/bhel.png") 
    },
    { 
      id: 124, 
      name: 'Dahi Batata Puri',
      hotelName: 'Food Court',  
      price: 70, 
      isVeg: true, 
      image: require("../assets/Dahi-Puri.jpg") 
    },
    { 
      id: 125, 
      name: 'Paani Puri', 
      hotelName: 'Food Court', 
      price: 50, 
      isVeg: true, 
      image: require("../assets/Pani-Puri.jpg") 
    },
    { 
      id: 126, 
      name: 'Ragada Puri ',
      hotelName: 'Food Court',  
      price: 60, 
      isVeg: true, 
      image: require("../assets/Ragda-Patties.jpg") 
    },
    { 
      id: 127, 
      name: 'Samosa Cone', 
      hotelName: 'Food Court', 
      price: 50, 
      isVeg: true, 
      image: require("../assets/bhaji-cone.jpg") 
    },
    { 
      id: 128, 
      name: 'Cheese Masala Grill', 
      hotelName: 'Food Court',
      price: 160, 
      isVeg: true, 
      image: require("../assets/cheese-grilled-sandwich.jpeg") 
    },
    { 
      id: 129, 
      name: 'Cheese Masala Toast',
      hotelName: 'Food Court', 
      price: 120, 
      isVeg: true, 
      image: require("../assets/Masala_Sandwich.jpg") 
    },
    { 
      id: 130, 
      name: 'Veg Pizza', 
      hotelName: 'Food Court',
      price: 260, 
      isVeg: true, 
      image: require("../assets/mix-veg-pizza.jpg") 
    },
    { 
      id: 131, 
      name: 'Panner Tikka Pizza ', 
      hotelName: 'Food Court',
      price: 280, 
      isVeg: true, 
      image: require("../assets/paneer-tikka-pizza.webp") 
    },
    { 
      id: 132, 
      name: 'Veg Burger ',
      hotelName: 'Food Court', 
      price: 80, 
      isVeg: true, 
      image: require("../assets/veg-burger.webp") 
    },
    { 
      id: 133, 
      name: 'Shezvan Burger',
      hotelName: 'Food Court', 
      price: 90, 
      isVeg: true, 
      image: require("../assets/shezvan-burger.jpeg") 
    },
    
  ];

  const handleSearch = () => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);

    if (results.length === 0) {
      setNoItemsHere(true); 
    } else {
      setNoItemsHere(false); 
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
          source={require("../assets/image-1.png")}
        />
      </View>

      <TextInput
        placeholder="Search dishes..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
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
    paddingVertical: 18,
    backgroundColor: Color.colorWhite,
  },
  innercontainer: {
    flexGrow: 1,
    backgroundColor: Color.colorWhite,    
  },
  innercontainer2: {
    flex: 1,    
    marginBottom:25,
  },
  searchInput: {
    marginBottom: 10,
    marginTop: 120,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Color.colorGainsboro,
    height: 40,
  },
  searchButton: {
    marginBottom: 15,
    backgroundColor: "rgba(0, 40, 255, 0.8)",
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
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
  dosaicon: {
    marginTop: 12,
    marginBottom: 0,
    marginLeft: -20,
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
  searchResults:{
    marginBottom:20,
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

export default SearchScreenDishes;