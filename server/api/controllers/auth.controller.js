import User from "../models/usermodel.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import  Jwt from "jsonwebtoken";




export const signup = async (req, res, next) => {
    console.log("this is enter in the controller")
    const { username, email, password } = req.body;
    try {
        const hashpassword = bcryptjs.hashSync(password, 10);
        console.log(hashpassword)

        const existUser = await User.findOne({ email: email })
        if (existUser) {
            return res.status(200).json({
                status: "success",
                message: "user already exists",
                success: "false"
                
            })
        }
        const newUser = await User.create({
            email: email,
            password: hashpassword,
            username: username
        })

            res.status(200).json({ message: "User created successfully", data: newUser });
    }
    catch (err) {
        next(err)
        console.log(err.message)
    }
};

export const signin =async(req, res,next)=>{
      const {email, password} = req.body;
      try{
        const vaildUser = await User.findOne({email});
         if(!vaildUser) return next(errorHandler(404,'User not found'))
         const vaildpassword = bcryptjs.compareSync(password,vaildUser.password);
        if(!vaildpassword)return next(errorHandler(401,'Password not match'))
         
        const token = Jwt.sign({id:vaildUser._id},process.env.JWT_SECRET);
        const {password: hashpassword, ...rest} = vaildUser._doc;
        const expiryDate = new Date(Date.now()+3600000)
        res.cookie('access_token',token,{httpOnly:true, expires:expiryDate}).status(200).json(rest)

      }
      catch(err){
            next(err)
      }
}