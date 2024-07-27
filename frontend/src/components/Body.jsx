import React, { useEffect } from "react";
import { Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";
import { setAuthUser, setSocketEmail } from '../redux/appSlice';
import useGetAllEmails from '../hooks/useGetAllEmails'
import io from 'socket.io-client'

const Body = ({setSocket,socket}) => {
  useGetAllEmails();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state)=>state.app.user)

  useEffect(() => {
    const getUser = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`, {
              withCredentials:true
          })
          if(res.data.success){
              dispatch(setAuthUser(res.data.user))
          }
      } catch (error) {
          console.log(error);
          navigate('/login')
      }
    };
    getUser()
  }, []);
  useEffect(()=>{
    if(user?._id){
      let socket = io(import.meta.env.VITE_BACKEND_URL)
      socket.emit('setup',user.email)
      setSocket(socket)

      const listener = (newEmail)=>{
        dispatch(setSocketEmail(newEmail))
      }
      socket.on("newEmailRecieved",listener)

      return () => {
        socket.off("newEmailRecieved",listener)
      }
    }
  },[user])
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
