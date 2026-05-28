const jwt = require('jsonwebtoken')
const AppError = require('./appError')
const httpSuccess = require('../utiles/httpSuccess')

const veryfiyToken = (req,res,next) =>{
    const authHeaders = req.headers['Authorization'] || req.headers['authorization']
    if(!authHeaders){
        return res.status(401).json(" token is required")
    }
    const token = authHeaders.split(' ')[1]
    try{
        const decodedToken = jwt.verify(token,process.env.Jwt_SECERT_KEY )
        req.decodedToken = decodedToken
        next()
    }catch(err){
         const error = AppError.create('inavlied token',401 ,httpSuccess.ERROR)
        return next(error)
    //    return  res.status(401).json("inavlied token")
    }
}
module.exports =veryfiyToken