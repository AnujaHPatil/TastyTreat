import React from 'react';
import { Image, View, Text, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color, FontFamily } from '../../GlobalStyles';


const ContactUsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />
      <View style={styles.topbar}>
      <Image
        style={styles.logo}
        contentFit="cover"
        source={require("../assets/app_logo2.png")}
      />
      </View>
      <Text style={styles.header}>TastyTreat</Text>

      <Text style={styles.description}>
      For any questions, feedback, or support related to our food delivery services, please don't hesitate to reach out to us. Our dedicated team is here to assist you
      </Text>
      <Text style={styles.subheader}>Contact Info</Text>
      <View style={styles.contactInfo}>
        <Ionicons name="mail" size={24} color="black" style={styles.icon} />
        <Text style={styles.infoText}>tastytreat@gmail.com</Text>
      </View>
      <View style={styles.contactInfo}>
        <Ionicons name="call" size={24} color="black" style={styles.icon} />
        <Text style={styles.infoText}>8956231245</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.infoText1}>We value your feedback and strive to provide the best food delivery experience. Your satisfaction is our priority!</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.infoText1}>Thank you for choosing us for your food delivery needs.</Text>
      </View>
      <Pressable onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Text style={styles.goBackText}>Go Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.colorWhite,
  },
  header: {
    fontSize: 40,
    marginBottom: 50,
    marginLeft:95,
  },
  topbar:{
    marginTop: 25,
    marginBottom:20,
    flexDirection: 'row',  
  },
  logo:{
    marginTop:10,
    marginBottom:0,
    marginLeft:5,
    width: 70,
    height: 70,
    borderRadius: 12,
    position: "absolute",
  },
  description: {
    fontSize: 18,
    marginBottom: 50,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 30,
    marginBottom: 40,
    marginLeft:5,
    textAlign:'left',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 18,
    marginLeft:5,
    padding:5,
  },
  infoText1: {
    fontSize: 18,
    textAlign:'center',
    marginLeft:5,
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

export default ContactUsPage;

