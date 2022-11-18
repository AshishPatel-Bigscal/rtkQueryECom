import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../app/Constants";


const initialState = {
    cart: [],
    user: {},
    loggedIn: false
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        userAuthanticated: (state, action) => {
            state.cart = action.payload.cart
            state.user = { id: action.payload.id, password: action.payload.password }
            state.loggedIn = true
        },
        setCart: (state, action) => {
            state.cart = action.payload
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        clearCart: (state) => {
            state.cart = []
        }
    }
});

export const { setCart, removeFromCart, clearCart, userAuthanticated, requestFail, requestSuccess } = userSlice.actions;


// export const cartDetail = (state) => state.user.cart;
export const userDetail = (state) => state.user;

export const authUser = (id, password) => async (dispatch) => {
    try {
        const query = `${BASE_URL}/users/${id}`;
        let response = await axios.get(query);
        response = await response.data;
        if (response.password === password) {
            return (dispatch(userAuthanticated(response)))
        }
        return "Password Not Match ";
    } catch (error) {
        return ("err -> authUser : ", error.message);
    }
}

export const registerUser = (id, password) => async (dispatch) => {

    try {
        const query = `${BASE_URL}/users`
        const newUser = {
            id: id,
            password: password,
            cart: []
        }
        await axios.post(query, newUser);
        return "Registration Successful.";
    } catch (error) {
        return "User Already Registered"
    }
}

export const addToCart = (userId, product) => async (dispatch, getState) => {
    try {

        let itemExistInCart = false;
        let newCart = [];
        let qty;
        const store = getState();
        let prevCart = store.user.cart;
        prevCart.forEach(item => {
            if (item.id === product.id) {
                itemExistInCart = true
                qty = item.quantity + product.quantity;
                newCart.push({ ...item, "quantity": qty })
            } else {
                newCart.push(item)
            }
        });
        if (itemExistInCart) {
            newCart = { "cart": [...newCart] }
        } else {
            newCart = { "cart": [...newCart, product] }
        }

        await axios.patch(`${BASE_URL}/users/${userId}`, newCart)
        dispatch(setCart(newCart.cart))

    } catch (error) {
        console.log("err -> addToCart : ", error.message)
    }
}