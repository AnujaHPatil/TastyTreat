import React from "react";
import { Image, Text, StyleSheet, TouchableOpacity, View, StatusBar, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { FontFamily, FontSize, Color, Border } from "../../GlobalStyles";

const WelcomePage = ({navigation}) => {
  const handleGetStarted = () => {
    navigation.navigate('SignupPage');
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(0, 210, 255, 1)", "rgba(30, 40, 255, 0.8)", "rgba(100, 43, 226, 0.87)"]}
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }}
    >
      <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>

          <Text style={styles.heading}>TastyTreat</Text>

          <Text style={styles.subHeading}>Online Food Ordering App</Text>
          
          <Image
              style={styles.foodPlate51}
              contentFit="cover"
              source={require("../assets/thali3.png")}
            />

            <Text style={styles.message}>{`       Satisfy Your Cravings      
                    with  
             Tasty Treat! `}</Text>


          <TouchableOpacity onPress={handleGetStarted} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.restaurantLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: "transparent",
    paddingVertical: 20,
    paddingHorizontal:10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  heading: {
    marginBottom:10,
    fontSize:55,
    fontWeight:'300',
    color: Color.colorWhite, 
  },
  subHeading: {
    fontSize: 20,
    marginTop:10,
    marginBottom: 320,
    color: Color.colorWhite,
  },
  foodPlate51: {
    marginTop:160,
    marginLeft:170,
    marginBottom:20,
    borderRadius: 0,
    width: 313,
    height: 260,
    position: "absolute",
  },
  message: {
    fontSize: 28,
    color: Color.colorWhite,
    alignItems: 'center',
    padding: 8,
  },
  button: {
    backgroundColor: 'white',
    width: 220,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop:50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: FontSize.size_13xl,
    color: "rgba(0, 40, 255, 0.8)",
  },
  restaurantLogin: {
    fontSize: 20,
    marginTop:10,
    fontWeight:'bold',
    color: Color.colorWhite,
  },
});

export default WelcomePage;
