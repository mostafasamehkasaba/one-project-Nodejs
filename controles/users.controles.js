const asyncWrapper = require('../middlewares/asynsWrapper');
const User = require('../models/usersmodule');
const httpSuccess = require('../utiles/httpSuccess');
const AppError = require('../middlewares/appError');
const bcrypt = require('bcrypt');
const generateJwt = require('../utiles/generateJwt');

const getAllusers = asyncWrapper(async (req, res) => {


    let query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;

    const skip = page > 1 ? (page - 1) * limit : 0;

    const users = await User.find({}, {"__v": false ,"password" : false, })
        .limit(limit)
        .skip(skip);

    res.json({
        status: httpSuccess.SUCCESS,
        data: { users }
    });
});

const register = asyncWrapper(async (req, res, next) => {

    const { fristName, lastName, email, password ,role} = req.body;
   const avater = req.file.filename

    const oldUser = await User.findOne({ email });

    if (oldUser) {

        const error = new AppError(
            "user already exists",
            404,
            httpSuccess.FAIL
        );

        return next(error);
    }

    const hasedPassword  = await bcrypt.hash(password , 10)

    const newUser = new User({
        fristName,
        lastName,
        email,
        password : hasedPassword,
        role,
        avater: req.file.filename
    });

    const token =  await generateJwt({email :newUser.email ,id  :newUser._id,role :newUser.role});

    newUser.token = token;

    await newUser.save();

        const {fristName:newFirstName , lastName:newLastName , email:newEmail , _id, } = newUser
    
    res.status(201).json({
        status: httpSuccess.SUCCESS,
        data: {
            user: {
                _id,
                newFirstName,
                newLastName,
                newEmail,
                token,
                role: newUser.role,
                avater: req.file.filename
                
            }
        }
    });

});

const login = asyncWrapper(async (req,res,next) => {
    
    const {email, password} = req.body;

    if(!email && !password ){
        const error = AppError.create('email and password is required' ,400 ,httpSuccess.FAIL)
        return next(error)
    }

    const user = await User.findOne({email :email})

    if(!user){
        const error = AppError.create('user not found ' , 401 ,httpSuccess.FAIL)
        return next(error)
    }

    const matchedPassword = await bcrypt.compare(password , user.password)

    if(user && matchedPassword){
        const token =  await generateJwt({email :user.email ,id  :user._id, role: user.role});
        return res.json({status : httpSuccess.SUCESS,  data : {token}})
    }else{
        const error = AppError.create('something  worng',500 ,httpSuccess.ERROR)

        return next(error)
    }

 })

module.exports = {
    getAllusers,
    register,
    login
}; 