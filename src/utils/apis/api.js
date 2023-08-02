import axios from 'axios';

export const getMeals = async () => {
  try {
    //update urls after confirmation from backend team
    const meals = await axios.get('/meals');
    return meals;
  } catch (error) {
    console.error('Error fetching meals: ', error);
    throw error;
  }
};

export const getOrders = async (userId) => {
  try {
    //update urls after confirmation from backend team
    const orders = await axios.get(`/orders/user/${userId}`);
    return orders;
  } catch (error) {
    console.error('Error fetching orders: ', error);
    throw error;
  }
};

export const updateCart = async (userId) => {
  try {
    //update urls after confirmation from backend team
    // await axios.put(`/users/cart?mealId=${mealId}`);
    // return true; //TBD what to return based on next action
    console.log('meal id added: ', mealId)
  } catch (error) {
    console.error('Error adding meal to cart: ', error);
    throw error;
  }
};

export const rateMeal = async (rating) => {
  try {
    //update urls after confirmation from backend team,
    // await axios.put(`/orders/user/${userId}/${mealId}`, rating);
    // return true; //TBD what to return based on next action
    console.log('meal rated: ', rating)
  } catch (error) {
    console.error('Error adding meal to cart: ', error);
    throw error;
  }
};

export const createUser = async (bodyObject) => {
  try{
    const response = await axios.post('http://localhost:3000/register', bodyObject);
    return response;
  } catch(err){
    console.log(err);
    throw err;
  }
}