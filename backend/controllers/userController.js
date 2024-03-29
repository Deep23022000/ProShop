import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

//@description Auth user and get token
//@route POST/api/users/login
//@access Public

const authUser = asyncHandler(async ( req,res) => {
    
    const { email, password } = req.body

    const user = await User.findOne({email})
    console.log(email)
    console.log(password)
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else
    {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


//@description Register a new User
//@route POST/api/users
//@access Public

const registerUser = asyncHandler(async ( req,res) => {
    
    const { name, email, password } = req.body

    const userExits = await User.findOne({email})
    
    if(userExits){
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    // console.log(email)
    // console.log(password)
    if(user)
    {
        console.log("user created")
        res.status(201)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }

    
   
})

//@description get User Profile
//@route POST/api/users/profile
//@access Private

const getUserProfile = asyncHandler(async ( req,res) => {
    
    const user = await User.findById(req.user._id)

    if(user){
       res.json({
        _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
       })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }

    
})

//@description update User Profile
//@route PUT/api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async ( req,res) => {
    
    const user = await User.findById(req.user._id)

    if(user){
       
        user.name= req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
    
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }

    
})

//@description get all Users
//@route GET/api/users
//@access Private/Admin
const getUsers = asyncHandler(async ( req,res) => {
    
    const users = await User.find({})
    res.json(users)
    })


//@description delete User
//@route DELETE/api/users/:id
//@access Private/Admin
const deleteUsers = asyncHandler(async ( req,res) => {
    
    const user = await User.findById( req.params.id)
    if(user){
        await user.deleteOne()
        res.json({ message: 'User removed'})
    } 
    else{
        res.status(404)
        throw new Error("User not found")
    }
    })

//@description get user by Id
//@route GET/api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async ( req,res) => {
    
    const user = await User.findById(req.params.id).select('-password')

    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    
    })
   
//@description update User
//@route PUT/api/users/:id
//@access Private/admin

const updateUser= asyncHandler(async ( req,res) => {
    
    const user = await User.findById(req.params.id)

    if(user){
       
        user.name= req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin 
    
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }

    
})

   

export {authUser,getUserProfile, registerUser,
     updateUserProfile, getUsers,deleteUsers,
    getUserById,updateUser }


