import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductsQuery } from "../services/productsAPI";
import ProductCard from './productCard';
import "./dashboard.css";
import { notify } from '../util/notification';
import { ToastContainer } from 'react-toastify';


const Dashboard = () => {
    const dispatch = useDispatch();
    const { data } = useGetProductsQuery();

    const showNitification = (msg) => {
        notify(msg)
    }
    return (
        <>
            <h2>All Products</h2>
            <div className='productContainer'>
                <div className='products'>
                    {
                        data?.map((itm, index) => {
                            return (
                                <ProductCard key={index} {...itm} notify={showNitification} />
                            )
                        })
                    }
                </div>
            </div>
            <ToastContainer
            />
        </>
    )
}

export default Dashboard