import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setEmails } from "../redux/appSlice";

export const fetchEmails = async (dispatch) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/email/getallemails`, {
            withCredentials: true
        });
        dispatch(setEmails(res.data.emails));

    } catch (error) {
        console.log(error);
    }
}

const useGetAllEmails = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetchEmails(dispatch);
    }, []);
};
export default useGetAllEmails;