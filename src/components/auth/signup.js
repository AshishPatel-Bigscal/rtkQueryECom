import React, { useEffect } from 'react'
import "./login.css"
import { } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaLogin } from "../../util/schema"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser, userDetail } from "../../services/userSlice";
import { notify } from "../../util/notification"
import { ToastContainer } from 'react-toastify';

const Signup = () => {
    const dispatch = useDispatch();
    const stateData = useSelector(userDetail);
    const { setValue, getValues, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchemaLogin)
    });

    const signupUser = () => {
        let username = getValues("username");
        let password = getValues("password");
        dispatch(registerUser(username, password))
            .then((res) => { notify(res) })
            .catch((err) => { notify(err) })
        setValue("username", "");
        setValue("password", "");
    }
    return (
        <div className='loginContainer'>
            <div className='bg-dark inputContainer'>
                <form onSubmit={handleSubmit(signupUser)} className='d-flex-column align-content-center justify-content-center' >

                    <h5 className="text-primary text-center font-monospace" >Signup for New Journey with Us</h5>
                    <input className='m-1 p-1 w-100' type="text" placeholder='Username'
                        {...register("username", { required: true, maxLength: 20 })}
                    />
                    <p className='m-0 p-0 text-white'>{errors.username?.message}</p>

                    <input className='m-1 p-1  w-100' type="password" placeholder='password'
                        {...register("password", { required: true, min: 6, max: 20 })}
                    />
                    <p className='text-white'>{errors.password?.message}</p>
                    <button className='w-100 m-1 p-1' type="submit">Register</button>
                    <p className=' text-center text-warning'>Already a Member?</p>

                </form>

                <Link to={"/"} style={{ color: "inherit", textDecoration: "inherit", width: "100%" }} >
                    <button className='w-100 m-1 p-1'>Login</button>
                </Link>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup