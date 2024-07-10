import React from "react";
import { MdCropSquare } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedEmail } from "../redux/appSlice";

const Email = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMail = () => {
    dispatch(setSelectedEmail(email));
    navigate(`/mail/${email._id}`);
  };
  const formateDate = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; 

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    const formattedTime = `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    return formattedTime;
  };
  return (
    <div
      onClick={openMail}
      className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:bg-[#f9f9f9]"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-400">
          <MdCropSquare size={"20px"} />
        </div>
        <div className="text-gray-400">
          <MdOutlineStarBorder size={"20px"} />
        </div>
        <div>
          <h1 className="font-semibold">{email?.subject}</h1>
        </div>
      </div>
      <div className="flex-1 ml-4">
        <p className="h-5 overflow-hidden">{email?.message}</p>
      </div>
      <div className="flex-none text-gray text-sm">
        <p>{email? formateDate(email.createdAt):''}</p>
      </div>
    </div>
  );
};

export default Email;
