import React, { useEffect } from "react";
import { Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";
import { setAuthUser } from '../redux/appSlice';

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/v1/user/getuser", {
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
