// // console.log(getState().user.cart);
// const store = getState();
// const prevCart = store.user.cart
// console.log(prevCart);
// const newCart = { "cart": [...prevCart, product] }
// const query = `${BASE_URL}/users/${userId}`
// let response = await axios.patch(query, newCart);
// if (response.status === 200) {
//     response = await response.data;
//     dispatch(setCart(response))
// }