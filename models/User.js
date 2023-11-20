const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const userSchema = new mongoose.Schema({
handle:{type:String,required:[true,"Please provide handle"],unique:true,match: /^(?=[a-zA-Z_])[a-zA-Z0-9_]*/,minlength:3, maxlength:20},
password:{type:String,required:[true,"Please provide password"],minlength:8, maxlength:30},
})


userSchema.pre('save',async function(next)
{
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log('Password hashed:', this.password);
        next();
    } catch (error) {
        next(error);
    }
})


userSchema.methods.comparePassword = async function(checkPass)
{
    return bcrypt.compare(checkPass,this.password)
}


userSchema.methods.createToken= function()
{
    return jwt.sign({handle:this.handle,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'})
}


module.exports = mongoose.model('User',userSchema)
