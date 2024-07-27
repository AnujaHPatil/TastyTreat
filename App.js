import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import 'firebase/database'; 

import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomePage from "./src/screens/HomePage";
import BurgerPage from "./src/screens/BurgerPage";
import PizzaPage from "./src/screens/PizzaPage";
import DessertPage from "./src/screens/DessertPage";
import ThaliPage from "./src/screens/ThaliPage";
import CartPage from "./src/screens/CartPage";
import FavouritePage from "./src/screens/FavouritePage";
import Mithila from "./src/screens/Mithila";
import Vivek from "./src/screens/Vivek";
import FoodCourt from "./src/screens/FoodCourt";
import ContactUsPage from "./src/screens/ContactUsPage";
import AboutUsPage from "./src/screens/AboutUsPage";
import PlaceOrder from "./src/screens/PlaceOrder";
import LoginPage from "./src/components/LoginPage";
import SearchScreenDishes from "./src/screens/SearchScreenDishes";
import SignupPage from "./src/components/SignupPage";
import UserAccountPage from "./src/components/UserAccountPage";
import ForgotPasswordScreen from "./src/components/ForgotPasswordScreen";
import YourOrders from "./src/screens/YourOrders";
import { AppProvider } from './AppContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <AppProvider>
    <NavigationContainer>
      {hideSplashScreen ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="BurgerPage" component={BurgerPage} />
          <Stack.Screen name="PizzaPage" component={PizzaPage} />
          <Stack.Screen name="DessertPage" component={DessertPage} />
          <Stack.Screen name="ThaliPage" component={ThaliPage} />
          <Stack.Screen name="CartPage" component={CartPage} />
          <Stack.Screen name="FavouritePage" component={FavouritePage} />
          <Stack.Screen name="Mithila" component={Mithila} />
          <Stack.Screen name="Vivek" component={Vivek} />
          <Stack.Screen name="FoodCourt" component={FoodCourt} />
          <Stack.Screen name="ContactUsPage" component={ContactUsPage} />
          <Stack.Screen name="AboutUsPage" component={AboutUsPage} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SearchScreenDishes" component={SearchScreenDishes} />
          <Stack.Screen name="SignupPage" component={SignupPage} />
          <Stack.Screen name="UserAccountPage" component={UserAccountPage} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <Stack.Screen name="YourOrders" component={YourOrders} />
        </Stack.Navigator>
      ) : null}
    </NavigationContainer>
    </AppProvider>
  );
};

export default App;


