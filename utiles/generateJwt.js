
const jwt = require('jsonwebtoken') 

module.exports=  async (payload) =>{
    const token = await jwt.sign(
        payload,
        process.env.Jwt_SECERT_KEY,{expiresIn : "30m"}
    )
    return token
}