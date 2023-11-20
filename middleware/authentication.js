// need to check the token now 
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = (req,res,next)=>{
const authHeaders = req.headers.authorization
console.log(authHeaders)
if(!authHeaders || !authHeaders.startsWith('Bearer '))
{
    throw new UnauthenticatedError('Authentication invalid')
}else
{
    const token = authHeaders.split(' ')[1]
    try
    {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {handle:payload.handle}
        next()
    }
    catch(err)
    {
        console.log(err)
        throw new UnauthenticatedError('Authentication invalid')
    }
}

}

module.exports = auth