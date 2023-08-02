import React, { useState, useContext, useEffect } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import AppText from "../../utils/components/AppText";
import CartCard from "./CartCard";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";
import {
  getUser,
  postCart,
  getMeals,
  getUserContact,
  getPayment,
} from "../../utils/apis/api";
import { format } from 'date-fns';

const Checkout = ({cartRefresh, handleCartRefresh}) => {
  const email = "Enid.Johns@yahoo.com";
  const [cartMeals, setCartMeals] = useState([]);
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState();
  const [address, setAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });
  const cost = 9.99;

  const submitOrder = () => {
    const final = {
      userId: user._id,
      currentCart: {...cart, orderDate: Date.now()}
    }
    let results = postCart(final);
  };

  useEffect(() => {
    getUser(email).then((data) => {
      const mealList = data.currentCart.meals;
      setCart(data.currentCart);
      setUser(data);
      getUserDetails(data._id);
      getMeals()
        .then((meals) => {
          const mealDetails = meals.filter((item) => {
            return mealList.includes(item._id);
          });
          setCartMeals(mealDetails);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, [cartRefresh]);

  const getUserDetails = async (userId) => {
    try {
      let contact = await getUserContact(userId);
      let payments = await getPayment(userId);
      let card = payments[0].ccId.toString();
      let last4 = '************' + card.slice(card.length - 4);
      setAddress(contact.deliveryAddress);
      setPayment(last4);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <Text>Cart is loading...</Text>
      ) : (
        <View className="flex flex-col">
          <View className="bg-pakistangreen items-center justify-center">
            <AppText
              className="text-3xl text-white ml-2 my-4"
              style={{ fontFamily: "ComfortaaBold" }}
            >
              Order Summary
            </AppText>
          </View>
          <View className="flex justify-end ml-2 mt-2">
          <AppText className="text-2xl text-pakistangreen my-2">
            Customer Information
          </AppText>
            <AppText className='mb-1'>
              {user.firstName} {user.lastName}
            </AppText>
            <AppText className='mb-1'>{user.email}</AppText>
            <AppText className='mb-1'>{address.address1}</AppText>
            {address.address2 === '' ? null : <AppText>{address.address2}</AppText>}
            <View className="flex-row">
            <AppText className='mb-1'>{address.city}, {address.state} {address.zip} </AppText>
            </View>
            <AppText className='mb-1'>Card on File: {payment}</AppText>
          </View>
          <AppText className="text-2xl text-pakistangreen ml-1 mt-2">
            Meals
          </AppText>
          <ScrollView bounces={false} className="h-[250]" >
            {cartMeals.map((meal) => (
              <CartCard meal={meal} key={meal.name} cart={cart} setCart={setCart} cartRefresh={cartRefresh}
              handleCartRefresh={handleCartRefresh}/>
            ))}
          </ScrollView>
          <View className="bg-pakistangreen h-1 mt-1" />
          <AppText className="text-lg text-pakistangreen ml-1 mt-2">
            Delivery Date: {cart.deliverDate}
          </AppText>
          <AppText className="text-lg text-pakistangreen ml-1 mt-2">
            Total Meals: {cart.meals.length}
          </AppText>
          <AppText className="text-lg text-pakistangreen ml-1 mt-2">
            Weekly Cost: ${cart.meals.length * cost}
          </AppText>
          <View className="justify-end items-center rounded-md">
          <Pressable
            onPress={submitOrder}
          >
            <AppText className="text-2xl bg-pakistangreen text-white p-4 m-4">
              Submit Order
            </AppText>
          </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default Checkout;
