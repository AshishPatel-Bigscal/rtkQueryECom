import React, { useEffect } from 'react';
import "./login.css";
import { } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaLogin } from "../../util/schema";
import { Link, useNavigate } from 'react-router-dom';
import { authUser, userDetail } from '../../services/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../util/notification';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(userDetail);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchemaLogin)
    });

    const OnSubmit = (values, e) => {
        e.preventDefault()
        dispatch(authUser(values.username, values.password))
            .then((res) => { notify(res) })
            .catch((err) => { notify(err) })
    }

    useEffect(() => {
        if (userData.loggedIn) {
            navigate("/homepage")
        }
    }, [userData, navigate])


    return (
        <div className='loginContainer'>
            <div className='bg-dark inputContainer'>
                <form onSubmit={handleSubmit(OnSubmit)} className='d-flex-column align-items-center justify-content-center' >
                    <h5 className="text-primary text-center font-monospace" >Login to Account</h5>
                    <input className='m-1 p-1 w-100' type="text" placeholder='Username'
                        {...register("username", { required: true, maxLength: 20 })}
                    />
                    <p className='m-1 p-1 text-white'>{errors.username?.message}</p>

                    <input className='m-1 p-1 w-100' type="text" placeholder='password'
                        {...register("password", { required: true, min: 6, max: 20 })}
                    />
                    <p className='text-white'>{errors.password?.message}</p>
                    <button className='w-100 m-1 p-1' type="submit" style={{ color: "inherit", textDecoration: "inherit", width: "100%" }} >
                        Login
                    </button>
                    <p className=' text-center text-warning'>Not Registered?</p>
                </form>

                <Link to={"/signup"} style={{ color: "inherit", textDecoration: "inherit", width: "100%" }} >
                    <button className='w-100 m-1 p-1'>Register Here</button>
                </Link>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login