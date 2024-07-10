import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setAuthUser } from '../redux/appSlice';

const Login = () => {

    const [input, setInput] = useState({
        email:"",
        password:""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/user/login", input, {
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            })

            if(res.data.success){
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <form onSubmit={submitHandler} className='flex flex-col gap-3 bg-white rounded-xl p-4 w-[20%] shadow-md'>
                <div className='flex items-center gap-1 mb-4'><img className='w-10' src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="logo" />
                <h1 className=' text-center font-bold uppercase text-3xl'>Login</h1></div>
                <input onChange={changeHandler} value={input.email} name="email" type='email' placeholder='Email' className=' text-xl border border-gray-400 rounded-md px-2 py-1' />
                <input onChange={changeHandler} value={input.password} name="password" type='password' placeholder='Password' className=' text-xl border border-gray-400 rounded-md px-2 py-1' />
                <button type="submit" className='bg-blue-700 text-xl rounded-md py-2 w-full text-white'>Login</button>
                <p>Don't have an account? <Link to={"/signup"} className='text-blue-600'>Signup</Link></p>
            </form>
        </div>
    )
}

export default Login