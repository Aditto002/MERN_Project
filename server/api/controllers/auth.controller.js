import User from "../models/usermodel.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
    // console.log(req.body.username)
    console.log("this is enter in the controller")
    // return;
    const { username, email, password } = req.body;
    // console.log(req.body.username)

    try {
        const hashpassword = bcryptjs.hashSync(password, 10);
        console.log(hashpassword)

        const existUser = await User.findOne({ email: email })
        if (existUser) {
            return res.status(200).json({
                status: "success",
                message: "user already exists"
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