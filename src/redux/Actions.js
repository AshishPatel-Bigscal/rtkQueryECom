import axios from "axios";
import {
    GET_USER_DETAIL, BASE_URL, GET_PRODUCTS, ADD_TO_CART, GET_CART_DETAIL, CLEAR_CART
} from "../app/Constants";
// import Store from "./Store";


export function getUserDetail(id, code) {
    return async (dispatch) => {
        try {
            let response = await axios.get(`${BASE_URL}/${id}`)
            response = await response.data
            if (response.password === code) {
                dispatch({ type: GET_USER_DETAIL, payload: response })
            } else {
                alert("Wrong Password")
            }
        } catch (err) {
            alert("User id not registered.")
        }
    }
}

export function getCartDetail(userId) {
    return async (dispatch) => {
        try {
            let response = await axios.get(`${BASE_URL}/cart`)
            response = await response.data
            dispatch({ type: GET_CART_DETAIL, payload: response })
        } catch (err) {
            alert("User id not registered.")
        }
    }
}

export function registerUser(email, password) {
    return async () => {
        try {
            await axios.post(BASE_URL, { "id": email, "password": password })
            alert("Registration successfull.")
        } catch (err) {
            // dispatch({ type: 'REGISTER_USER_FAIL' })
            alert("user id / email already exist")
        }
    }
}

export function getProducts() {
    return async (dispatch) => {
        try {
            let response = await axios.get(BASE_URL);
            response = await response.data;
            dispatch({ type: GET_PRODUCTS, payload: response })
        } catch (err) {
            console.log("ERROR in GET PRODUCTS : ", err.message)
        }


    }
}

// export function addToCart(userId, product) {
//     let newProduct = { "userId": userId, ...product }
//     return async (dispatch) => {
//         let finalQuery = `${BASE_URL_USERS}/${userId}/cart`
//         await axios.post(finalQuery, newProduct)
//         dispatch({ type: ADD_TO_CART, payload: newProduct })
//     }
// }

export function addToCart(userId, product) {

    // const store = Store.getState();
    // const prevCart = store.userReducer.userDetail.cart;

    return async (dispatch) => {

        // let newCart = { "cart": [...prevCart, { ...product }] }

        let finalQuery = `${BASE_URL}/${userId}`
        // await axios.patch(finalQuery, newCart)
        dispatch({ type: ADD_TO_CART, payload: product })
    }
}

export function clearCart(userDetail) {
    // return async (dispatch) => {
    //     await axios.delete(BASE_URL_CART + `/1`)
    //     // dispatch({ type: CLEAR_CART })
    // }
}

