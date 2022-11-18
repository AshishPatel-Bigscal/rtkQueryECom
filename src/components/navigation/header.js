import React from 'react'
import "./header.css"
import { useSelector, useDispatch } from 'react-redux'
import { MdPermIdentity, MdOutlineArrowDropDown, MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import { userDetail } from "../../services/userSlice";



const Header = () => {
    const userData = useSelector(userDetail)
    const user = userData?.user;
    const cartDetail = userData?.cart
    const totalItems = cartDetail?.reduce((result, obj) => result + obj.quantity, 0)
    const totalPrice = cartDetail?.reduce((result, obj) => result + (+obj.price * obj.quantity), 0) || 0;
    return (
        <div className='headerContainer'>
            <div className='d-flex w-100 h-100'>
                <div className='headeruserData'>
                    <h4 className='companyTitle'>My Shop</h4>
                    <span>
                        <MdPermIdentity />
                        <span className='userSetting'>
                            {user.id}
                            <MdOutlineArrowDropDown />
                        </span>

                    </span>
                </div>
                {/* <button> clearCart</button> */}
                <div className='headerCartDetail'>
                    {totalItems > 0
                        ? < MdShoppingCart size={35} />
                        : < MdOutlineShoppingCart size={35} />}
                    <span>Items : {totalItems}</span>
                    <span>Amount : {totalPrice}</span>
                </div>
            </div>
        </div>
    )
}
export default Header
