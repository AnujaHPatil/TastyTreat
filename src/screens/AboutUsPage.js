import React from 'react';
import { Image, View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { Color, FontFamily } from '../../GlobalStyles';
import { StatusBar } from 'react-native';

const AboutUsPage = ({navigation}) => {

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.innercontainer}>
        <View style={styles.topbar}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/app_logo2.png")}
        />
        </View>
        <Text style={styles.header}>TastyTreat</Text>
        <Text style={styles.heading}>Welcome to TastyTreat</Text>
        <Text style={styles.text}>
            Your ultimate destination for delicious meals delivered right to your doorstep. Our mission is to make food ordering and delivery seamless, convenient, and delightful for everyone.
        </Text>
        <Text style={styles.heading}>Our Purpose</Text>
        <Text style={styles.text}>
            At TastyTreat, we believe in bringing people together through the joy of good food. Whether you're craving a comforting bowl of pasta, a sizzling burger, or a healthy salad, we've got you covered.
        </Text>
        <Text style={styles.heading}>Our Team</Text>
        <Text style={styles.text}>
            Their is a dedicated team behind TastyTreat. We are a passionate group of food enthusiasts, designers, developers, and customer support experts working together to revolutionize the food delivery industry.
        </Text>

        <Pressable onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Text style={styles.goBackText} >Go Back</Text>
        </Pressable>
        </ScrollView>

        
    </View>
  );
};

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
  header: {
    fontSize: 44,
    marginBottom: 50,
    marginLeft:90,
    // fontFamily: FontFamily.OutfitVariableFont_wght,
  },
  topbar:{
    marginTop: 25,
    marginBottom:20,
    flexDirection: 'row',  
  },
  logo:{
    marginTop:10,
    marginBottom:0,
    marginLeft:0,
    width: 75,
    height: 75,
    borderRadius: 12,
    position: "absolute",
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign:'justify',
    padding:2,
  },
  memberInfo: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  goBackButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 40, 255, 0.8)",
    borderRadius: 10,
    width:150,
    height:40,
    marginLeft:100,
  },
  goBackText: {
    color: '#fff',
    fontSize: 18,
    justifyContent:'center',
    textAlign:'center'
  },
});

export default AboutUsPage;
