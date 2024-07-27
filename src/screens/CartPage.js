import React, { useContext, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Alert, TextInput, Image, View, Text, Pressable, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../GlobalStyles';
import { AppContext } from '../../AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CartPage = React.memo(({ navigation }) => {
  const route = useRoute();
  const { cart,setCart } = useContext(AppContext);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('Home Delivery');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [count, setCount] = useState(1);
  const { ordersCount, setOrdersCount } = useContext(AppContext);
  const [deliveryCharge, setDeliveryCharge] = useState('');


  const handleDeliveryOptionChange = (option) => {
    setSelectedDeliveryOption(option);

    if (option === 'Self Pickup') {
      setDeliveryCharge(0); 
    } else {
      setDeliveryCharge(20); 
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    const itemTotals = {}; 

    cart.forEach(item => {
      const itemId = item.id;
      const itemPrice = item.price;
      const itemCount = cart.filter(cartItem => cartItem.id === itemId).length; 

      if (!itemTotals[itemId]) {
        itemTotals[itemId] = itemCount * itemPrice;
      } else {
        itemTotals[itemId] += itemCount * itemPrice;
      }
    });
  
    Object.values(itemTotals).forEach(itemTotal => {
      totalPrice += itemTotal;
    });
  
    return totalPrice.toFixed(2);
  };
  

  const calculateTaxesAndCharges = () => {
    const totalPrice = calculateTotalPrice();
   
    const taxesAndCharges = (totalPrice * 5) / 100 ; 
    return taxesAndCharges.toFixed(2);
  };

  const roundOffTotal = (total) => {
    return Math.round(total);
  };

  const getTotalBill = () => {
    const totalPrice = parseFloat(calculateTotalPrice());
    const taxesAndCharges = ordersCount < 5 ? 0 : parseFloat(calculateTaxesAndCharges());
    const deliveryCharge = selectedDeliveryOption === 'Home Delivery' ? 20 : 0;
    let totalBill = totalPrice + deliveryCharge + taxesAndCharges;
  
    if (!isNaN(totalBill)) {
      totalBill = totalBill.toFixed(2);
    } else {
      totalBill = 'N/A';
    }
  
    return totalBill;
  };

  const handlePlaceOrder = () => {
    const totalBill = roundOffTotal(getTotalBill());
    
    setOrdersCount((prevCount) => prevCount + 1); 
    navigation.navigate('PlaceOrder', {
      totalBill,
      selectedDeliveryOption,
      specialInstructions,
      itemCount: cart.length + (count - 1),
    });
  };
  

  const DishItem = ({ item }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
      setQuantity(quantity + 1);
      
    };

    const handleRemove = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        
      } else {
        const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
        setCart(updatedCart);
      }
     };
    
    return (
      <View >
      <View style={styles.itemContainer}>
      <Text style={styles.hotelName}>{item.hotelName}</Text>
        <View style={styles.itemDetails}>
        {item.isVeg ? (
            <Ionicons name="leaf" size={24} color="green" style={styles.vegIcon} />
          ) : (
            <MaterialCommunityIcons name="hamburger" size={24} color="red" style={styles.nonVegIcon} />
          )}
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleRemove}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={handleAdd}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setCount(quantity)}>
          <Text style={styles.quantityButton}>ADD</Text>
        </TouchableOpacity>
      </View>
      
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorWhite} barStyle="dark-content" />
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Your Cart</Text>
      </View>

      {cart.length === 0 || count === 0 ?  (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.noodlesIcon}
            source={require("../assets/hakka-noodle-1.png")}
          />
          <Text style={styles.noitemstext}>No items yet</Text>
        </View>
      ) : (
        <ScrollView>

          <View style={styles.billContainer}>
            {cart.map((item) => (
              <DishItem key={item.id} item={item} />
            ))}

            <View style={styles.OptionContainer}>
            <View style={styles.deliveryOptionContainer}>
              <View style={styles.deliveryOptionRow}>
                <Text style={styles.deliveryOptionLabel}>Delivery Option:</Text>
                <TouchableOpacity
                  style={styles.deliveryOptionButton}
                  onPress={() => handleDeliveryOptionChange(selectedDeliveryOption === 'Home Delivery' ? 'Self Pickup' : 'Home Delivery')}
                >
                  <Text style={[styles.deliveryOptionLabel, { color: "rgba(0, 40, 255, 0.8)" }]}>{selectedDeliveryOption}</Text>
                </TouchableOpacity>
              </View>
            </View>

            
            <View style={styles.specialInstructionsContainer}>
              <Text style={styles.specialInstructionsLabel}>Special Instructions:</Text>
                <TextInput
                  style={styles.specialInstructionsInput}
                  placeholder="Enter special instructions"
                  multiline
                  numberOfLines={4}
                  value={specialInstructions}
                  onChangeText={setSpecialInstructions}
                />
            </View>
            <View style={styles.divider} />
            <View style={styles.billText}>
              <Text style={styles.deliveryOptionLabel}>Payment Method :</Text>
              <Text style={styles.deliveryOptionLabel1}> Cash on Delivery Only</Text>
            </View>
            </View>

            
            <View style={styles.OptionContainer2}>
            <View style={styles.billDetailsContainer}>
              <Text style={styles.headerText}>Bill Details</Text>
              <View style={styles.billText}>
                <Text style={styles.billText1}>Item Qty :</Text>
                <Text style={styles.billText2}>{(cart.length + (count-1))}</Text>
              </View>
              <View style={styles.billText}>
                <Text style={styles.billText1}>Item Total price :</Text>
                <Text style={styles.billText2}>₹ {calculateTotalPrice()}</Text>
              </View>
              <View style={styles.billText}>
                <Text style={styles.billText1}>Delivery charges :</Text>
                <Text style={styles.billText2}>₹ {selectedDeliveryOption === 'Home Delivery' ? '20' : '0.00'}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.billText}>
                <Text style={styles.billText1}>Taxes and charges :</Text>
                <Text style={styles.billText2}>₹ {ordersCount < 5 ? '0.00' : calculateTaxesAndCharges()}</Text>
              </View>
              <View style={styles.billText}>
                <Text style={styles.billText1}>Total Bill :</Text>
                <Text style={styles.billText2}>₹ {getTotalBill()}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.billText}>
                <Text style={styles.billText1}>{`Total Bill Payable (Rounded Off)`} :</Text>
                <Text style={styles.billText2}>₹ {roundOffTotal(getTotalBill())}</Text>
              </View>
            </View>

            </View>

            <TouchableOpacity onPress={handlePlaceOrder} style={styles.placeOrderButton}>
                  <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity> 
          </View>        
        </ScrollView>
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
          <Ionicons name="cart" size={24} color="rgba(0, 40, 255, 0.8)" />
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
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.colorWhite,
  },
  topbar: {
    marginTop: 35,
    flexDirection: 'row',
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    marginLeft: 90,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noodlesIcon: {
    marginBottom: 50,
    marginLeft: 70,
    borderRadius: 430,
    width: 240,
    height: 200,
    opacity: 0.3,
    position: "absolute",
  },
  noitemstext: {
    fontSize: 30,
    marginBottom: 350,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  billContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    marginTop:5,    
    textAlign: 'center',
    marginRight:15,
  },
  hotelName: {
    fontSize: 0.1,
    color: '#f0f0f0',
  },
  vegIcon: {
    marginRight: 3,
  },
  nonVegIcon: {
    marginRight: 3,
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    height: 70,
    backgroundColor: '#f0f0f0',
    borderColor: 'black',
    borderWidth: 1,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    height: 33,
    width: 90,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 10,
    color: 'rgba(0, 40, 255, 0.8)',
  },
  quantity: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: 'rgba(0, 40, 255, 0.8)',
  },
  deliveryOptionContainer: {
    
  },
  OptionContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding:10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop:10,
  },
  deliveryOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryOptionLabel: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: '500',
  },
  deliveryOptionLabel1: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: '500',
    color: 'rgba(0, 40, 255, 0.8)'
  },
  OptionContainer2: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding:10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop:25,
    marginBottom:20,
  },
  
  specialInstructionsContainer: {
    marginTop: 20,
  },
  specialInstructionsLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  specialInstructionsInput: {
    borderWidth: 1,
    borderColor: Color.colorGray,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: Color.colorBlack,
    height: 70,
    textAlignVertical: 'top',
    backgroundColor:'white',
    marginBottom:15,
  },
  billDetailsContainer: {
    marginTop: 10,  
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  billText:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:5,
  },
  billText1:{
    fontSize: 18,
    fontWeight: '100',
    paddingBottom:5, 
  },
  billText2:{
    fontSize: 18,
    fontWeight: '500',
    paddingBottom:5,  
  },
  billText3:{
    fontSize: 18,
    fontWeight: '100',
    paddingBottom:5, 
    color:'rgba(0, 40, 255, 0.6)',
  },
  deliveryOptionButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  divider: {
    borderBottomColor: "rgba(0, 40, 255, 0.8)",
    borderBottomWidth: 0.9,
    marginBottom: 5,
    borderStyle: 'dashed',
  },
  placeOrderButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    // marginTop: 20,
    marginBottom:50,
  },
  placeOrderText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  freeFriesText: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default CartPage;