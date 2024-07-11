import React from "react";
import { IoMdStar } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";
import {
  MdInbox,
  MdOutlineDrafts,
  MdOutlineKeyboardArrowDown,
  MdOutlineWatchLater,
} from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/appSlice";


const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-[15%]">
      <div className="p-3">
        <button
          onClick={() => dispatch(setOpen(true))}
          className="flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow-md"
        >
          <LuPencil size="24px" />
          Compose
        </button>
      </div>
      <div className="text-gray-600">
        <Link to="/"><div className="flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200">
        <MdInbox size={"20px"} />
          <p>Inbox</p>
        </div></Link>
        <div className="flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200">
        <IoMdStar size={"20px"} />
          <p>Starred</p>
        </div>
        <div className="flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200">
        <MdOutlineWatchLater size={"20px"} />
          <p>Snoozed</p>
        </div>
        <Link to="/sendemails"><div className="flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200">
        <TbSend2 size={"20px"} />
          <p>Sent</p>
        </div></Link>
        <div className="flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200">
        <MdOutlineDrafts size={"20px"} />
          <p>Drafts</p>
        </div>
        <div className="flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200">
        <MdOutlineKeyboardArrowDown size={"20px"} />
          <p>More</p>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
