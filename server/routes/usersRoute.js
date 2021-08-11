const express = require('express');
const asyncHandler = require('express-async-handler')
const User = require('../models/User');
const generateToken = require('../utils/generateToken')
const authMiddleware = require('../middlewares/authMiddleware');

//Routes
const usersRoute = express.Router();

//Register
usersRoute.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    
    //check to see if user exist before creating
    if(userExist) {
            throw new Error('User Exist');
    }

    const createdUser = await User.create({
        name, email, password
    });
    res.status(201).json({ 
        _id: createdUser._id, 
        name: createdUser.name, 
        email: createdUser.email, 
        password: createdUser.password,
        token: generateToken(createdUser._id)
      })
  })
);

//login
usersRoute.post('/login', 
    asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check to see if user exist
    const user = await User.findOne({ email });
           if(user && (await user.isPasswordMatch(password)) ) {
            res.status(200).json({ 
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                password: user.password,
                token: generateToken(user._id)
              }) 
           }else{

           res.status(401).json('invalid credentials');
           }
      
}));

//fetch or get all users
usersRoute.get('/', authMiddleware, async (req, res) => {
    try{
     
    //   res.send(req.headers)
    //   console.log(req.headers);
      res.status(200).send(req.body);
    } catch(error){
        console.log(error, 'errorr')
    }
});

// //update user
// usersRoute.put('/update', async (req, res) => {
//     try{
//       res.send(req.body)

//     } catch(error){
//         console.log(error, 'user not registered')
//     }
// });


// //delete
// usersRoute.delete('/delete', async (req, res) => {
//     try{
//         const {name, email, password} = req.body;
//       res.send(req.body)
//     } catch(error){
//         console.log(error, 'user not registered')
//     }
// });


module.exports = usersRoute