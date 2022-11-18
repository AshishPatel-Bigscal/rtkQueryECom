import React, { useState, useEffect } from 'react'
import "./productCard.css"
import { useDispatch, useSelector } from 'react-redux';
import { userDetail, addToCart, removeFromCart, clearCart } from "../services/userSlice";



const initialProductValues = {
    id: "",
    image: "",
    type: "",
    brand: "",
    model: "",
    quantity: "",
    price: ""
}

const ProductCard = ({ id, image, type, brand, model, price, notify }) => {


    const { user, cart } = useSelector(userDetail)
    const cartProducts = cart;
    const userId = user.id
    const dispatch = useDispatch();
    const [product, setProducts] = useState(initialProductValues)
    const [quantity, setQuantity] = useState(1);
    const [flag, setFlag] = useState(false)
    const totalItems = cartProducts?.reduce((result, obj) => result + obj.quantity, 0)

    // useEffect(() => {
    //     cartProducts.forEach((item) => {
    //         if (item.id === id) {
    //             return (
    //                 setQuantity(item.quantity)
    //             )
    //         }
    //     })
    // }, [cartProducts, id])


    useEffect(() => {
        if (flag) dispatch(addToCart(userId, product))

    }, [dispatch, product, flag, userId])

    const changeQuantity = (type) => {
        if (type === "remove") {
            if (quantity > 1) setQuantity(quantity - 1)
        } else {
            if (quantity < 3) setQuantity(quantity + 1)
        }
    }


    const addProducts = () => {
        setProducts({ id, image, type, brand, model, quantity, price })
        setFlag(true)
        notify("Item Added to Cart")
    }


    return (
        <div className='productCard'>
            <div className='imgContainer'><img src={require("../images/" + image)} alt='productImage' /></div>
            <span>{type}</span>
            <span>{brand}</span>
            <span>{model}</span>
            <span>{price}</span>
            <div className='d-block'>
                <button className='quantityBtn' onClick={() => changeQuantity("remove")}>-</button>
                <span className='m-2 p-2'>{quantity}</span>
                <button className='quantityBtn' onClick={() => changeQuantity("add")}>+</button>
            </div>
            <button className=' w-100 m-1 p-1 btnAddToCart' onClick={() => addProducts()}>Add to Cart</button>
        </div>
    )
}

export default ProductCard