import React, { useState, useRef } from 'react';
import { Image, View, Text, Pressable, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color, FontFamily, FontSize, Border } from '../../GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HorizontalContentCarousel from './HorizontalContentCarousel';
import PromotionsCarousel from './PromotionsCarousel';

const HomePage = React.memo(({ navigation }) => {
  const openMithilaPage = () => {
    navigation.navigate('Mithila');
  };

  const openFoodCourtPage = () => {
    navigation.navigate('FoodCourt');
  };
 
  const openVivekPage = () => {
    navigation.navigate('Vivek');
  };

  const horizontalContentData = [
    { id: 1, 
      title: 'Mithila Only Veg', 
      description:"Snacks, Lunch, Dinner",
      onPress: openMithilaPage, 
      isVeg: true,
      backgroundColor: "rgba(30, 80, 255, 0.25)",
      image: require("../assets/matar-paneer2-1.png")  
    },
    { id: 2, 
      title: 'Food Court ', 
      description:"Breakfast and Snacks",
      onPress: openFoodCourtPage, 
      isVeg: true,
      backgroundColor: 'rgba(10, 215, 175, 0.25)',
      image: require("../assets/Cheesy-Veg-Grilled-Sandwich.jpg")  
    },
    { id: 3, 
      title: 'Vivek Hotel      Veg/Nonveg ',
      description:"Snacks, Lunch, Dinner", 
      onPress: openVivekPage, 
      isVeg: false,
      backgroundColor: 'rgba(10, 150, 255, 0.25)',
      image: require("../assets/chicken-cury.jpg") 
    },
  ];

  const promotionsData = [
    {
      id: 1,
      title: "Unwind with Mithila’s ,",
      offer: "Special Punjabi Thali, ",
      discount: "yours for only ₹140!",
      image: require("../assets/thali3.png"),
    },
    {
      id: 2,
      title: "Unlock this exclusive deal",
      offer: "zero tax on your first ten orders! ",
      discount: "Don't miss out this chance",
      image: require("../assets/pasta-1.png"),
    },
    {
      id: 3,
      title: "Today’s Offer",
      offer: "On all orders above ₹ 300/-",
      discount: "Free French Fries ",
      image: require("../assets/french-fries2-1.png"),
    },
    
  ];
  
  const openUserAccount = () => {
    navigation.navigate('UserAccountPage');
  };

  const openSearchScreen = () => {
    navigation.navigate('SearchScreenDishes');
  };


  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        
        <View style={styles.topBar} >
          <Pressable onPress={() => navigation.navigate('YourOrders')} >
            <Ionicons name="receipt" size={24} color="black" />
          </Pressable>
          <Pressable onPress={openUserAccount} style={styles.userIcon}>
            <Ionicons name="person-circle-outline" size={32} color="black" />
          </Pressable>
        </View>

        <Pressable style={styles.searchBar} onPress={openSearchScreen}>
          <Ionicons name="search" size={20} color="black" />
          <Text style={styles.searchPlaceholder}>Search for restaurants...</Text>
        </Pressable>

        <ScrollView style={styles.innercontainer2}>
        <View style={styles.foodimagesbar}>
        <Pressable
          style={styles.square}
          onPress={() => navigation.navigate('ThaliPage')}
        >
        <Image
            style={styles.foodplate}
            contentFit="cover"
            source={require("../assets/panjabi-thali10.png")}
            
          />
        </Pressable>
        <Pressable
          style={styles.square}
          onPress={() => navigation.navigate('BurgerPage')}
        >              
        <Image
          style={styles.burger}
          contentFit="cover"
          source={require("../assets/burder-1.png")}
        />
        </Pressable>
        <Pressable
          style={styles.square}
          onPress={() => navigation.navigate('PizzaPage')}
        >
        <Image
          style={styles.pizza}
          contentFit="cover"
          source={require("../assets/pizza2-2.png")}
        />
        </Pressable>  
        <Pressable
          style={styles.square}
          onPress={() => navigation.navigate('DessertPage')}
        >
        <Image
          style={styles.dessert}
          contentFit="cover"
          source={require("../assets/Pani-Puri2.png")}
        />
        </Pressable>
        </View>

        <View style={styles.name}>
        <Text>{`Thali`}</Text>
        <Text >{`  Burger`}</Text>
        <Text >{`  Pizza`}</Text>
        <Text >{`Chat`}</Text>
        </View>

        <Text style={styles.promotionsText}>Promotions</Text>
        <PromotionsCarousel 
          promotionsData={promotionsData} 
          />

        <Text style={styles.promotionsText}>Restaurants</Text>
        <HorizontalContentCarousel data={horizontalContentData} navigation={navigation} />

        
      </ScrollView>
      </View>

      {/* Taskbar */}
      <View style={styles.taskbar}>
      <Pressable onPress={() => navigation.navigate('HomePage')}>
        <Ionicons name="home" size={24} color="rgba(0, 40, 255, 0.8)" />
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
  container:{
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
  },
  topBar: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:30,
    paddingHorizontal: 10, 
    
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.colorGainsboro,
    padding: 10,
    borderRadius: 10,
    marginTop:10,
    marginBottom: 10,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: Color.colorGray_100,
  },
  square: {
    width: '22%', 
    aspectRatio: 1, 
    backgroundColor: '#ECECEC', 
    marginBottom: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodplate:{
    marginTop:10,
    width: 70,
    height: 40,
    position: "absolute",
  },
  burger: {
    marginTop:10,
    width: 68,
    height: 50,
    position: "absolute",
  },
  pizza: {
    marginTop:10,
    width: 67,
    height: 37,
    position: "absolute",
  },
  dessert: {
    marginTop:10,
    width: 64,
    height: 62,
    position: "absolute",
  },
  name:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 1,
    fontSize:FontSize.size_5xl,
  },
  foodimagesbar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    marginTop:1,
  },
  promotionsText: {
    fontSize: 28, 
    textAlign: 'left',
    marginTop: 30,
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
  horizontalContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20,
    marginBottom:50,
  },
 
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15,
  },
  itemName: {
    fontSize: 18 ,
    marginLeft: 10,
    fontWeight:'600',
  },
  itemdescription:{
    fontSize: 16 ,
    marginLeft: 10,
    marginTop:10,
  },
  itemImage: {
    width: 135,
    height: 119,
    borderRadius:20,
  },
});

export default HomePage;
