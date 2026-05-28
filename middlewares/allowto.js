const AppError = require("./appError")

module.exports = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.decodedToken.role)){
            return next(AppError.create('this role is not authrize'))
        }
        next()
    }
}