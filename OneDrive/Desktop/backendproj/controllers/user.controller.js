import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    res.status(200).json({
        success: true,
        message: "user registered successfully"
    })
    //get user details from frontend
    //validations-not empty
    //check if user already exists
    //checkfor images, check for avatar
    //upload images to clodinary,avatar
    //create user object -create entry in db
    //remove password and refresh token from response
    //check for user creation
    //return response to frontend

    const { fullname, email, username, password } = req.body;
    console.log("email:", email);

    if (!fullname || !email || !username || !password) {
    throw  new ApiError("All fields are required", 400);
    }
    const  existedUser= User.findOne({
        $or:[{username},{email}]

    })
    if(existedUser){
        throw new ApiError(409,"already existed")
    }
    const avatarlocalFilePath =req.files?.avatar[0]?.path;
    const coverlocalFilePath =req.files?.coverImage[0]?.path;

    if(!avatarlocalFilePath){
        throw new ApiError(400,"avatar file is required");
    }
    const avatar = await uploadOnCloudinary(avatarlocalFilePath);
    const coverImage = await uploadOnCloudinary(coverlocalFilePath);

    if(!avatar){
        throw new ApiError(400,"avatar file is required");
    }
    const User= await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||" ",
        email,
        password,
        username:username.toLowercase()

    })
    const createdUser= await User.findByID(User._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
         throw new ApiError(400,"something went wrong while registering user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser,"user registered successfully"))
    
})

export { registerUser }
