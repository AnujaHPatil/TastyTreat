import React, { createContext, useState, useEffect } from 'react';
import { auth } from './firebase'; 

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0); 
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const deliveryCharge = 20; 

  const calculateTotalBill = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity; 
    });

    const deliveryCharges = ordersCount < 2 ? 0 : deliveryCharge;
    total += deliveryCharges;

    return total;
  };

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFromFavorites = (itemId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== itemId));
  };

  const addOrder = (order) => {
    setConfirmedOrders((prev) => [...prev, order]);
    setOrdersCount((prevCount) => prevCount + 1); // Increment order count
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        totalBill: calculateTotalBill(),
        setTotalBill,
        favorites,
        setFavorites,
        ordersCount,
        setOrdersCount,
        addOrder, 
        confirmedOrders,
        removeFromFavorites,
        addToFavorites, 
        setConfirmedOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export { AppContext, AppProvider };

