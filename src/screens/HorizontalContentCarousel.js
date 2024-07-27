import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const HorizontalContentCarousel = ({navigation, data }) => {

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
  

  

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}
          onPress={item.onPress}
        >
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            {item.isVeg ? (
              <Ionicons name="leaf" size={24} color="green" style={styles.vegIcon} />
            ) : (
              <MaterialCommunityIcons name="hamburger" size={24} color="red" style={styles.nonVegIcon} />
            )}
            <Text style={styles.itemName}>{item.title}</Text>
          </View>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop:20,
    width: 162,
    height: 260,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(30, 40, 255, 0.2)',
    marginBottom:50,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
  },
  itemName: {
    fontSize: 18 ,
    marginLeft: 10,
    fontWeight:'600',
    marginBottom:10,
  },
  itemdescription:{
    fontSize: 16 ,
    marginLeft: 10,
    // marginTop:10,
  },
  itemImage: {
    width: 138,
    height: 125,
    borderRadius:12,
    marginBottom:10,
  },
  vegIcon:{
    marginBottom:10,
  },
  nonVegIcon:{
    marginBottom:10,
  },
});

export default HorizontalContentCarousel;


