import { produceEmail } from "../kafka/index.js";
import { Email } from "../models/email.model.js";

export const createEmail = async (req, res) => {
    try {
        const userId = req.id;
        const {to, subject, message} = req.body;
        if(!to || !subject || !message) return res.status(400).json({message:"All fields are required", success:false});

        const _message = {to,subject,message,userId}
        await produceEmail(JSON.stringify(_message))
    
        return res.status(201).json({message:"Email created success"})
    } catch (error) {
        console.log(error);
    }
}
export const deleteEmail = async (req,res) => {
    try {
        const emailId = req.params.id;
        
        if(!emailId) return res.status(400).json({message:"Email id is required"});

        const email = await Email.findByIdAndDelete(emailId);

        if(!email) return res.status(404).json({message:"Email is not found"});

        return res.status(200).json({
            message:"Email Deleted successfully"
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllEmail = async (req,res)=>{
    try {
        const userId = req.id;
        const email = req.email;
        const emails = await Email.find({"$or":[{userId:userId},{to:email}]}).sort({createdAt:-1});
        return res.status(200).json({emails});
    } catch (error) {
        console.log(error);
    }
}