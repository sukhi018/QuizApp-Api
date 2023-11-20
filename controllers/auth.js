const User = require('../models/User')

const register = async(req,res)=>{
    try
    {
        console.log(req.body)
        await User.create({...req.body})
        res.status(201).json({msg:'Created account',success:true, something:User.create})
    }catch(err)
    {
        res.status(404).json({msg:err})

    }

}

const login = async(req,res)=>{
    try
    {
        const {handle,password} = req.body
        const user = await User.findOne({handle})
        console.log(user)
        if (user)
        {
            const passCheck = await user.comparePassword(password)
            if (passCheck)
            {
                const token = await user.createToken()
                res.status(200).json({msg:'Logged in', token,success:true})
            }else
            {
                res.status(401).json({msg:'Invalid credentials'})
            }
    
        }else
        {
            res.status(404).json({msg:'Account not found'})
        }
    }catch(err)
    {
        console.log(err)
    }
}



module.exports = {register,login}