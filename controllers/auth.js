
const User=require("../model/User")
const bcrypt = require('bcrypt');
const createToken=require("../utils/createToken")

const login=async(req,res)=>{

    console.log(555)

    const{email,password}=req.body
    
    let user = await User.findOne({ email })

    ///If the WRITE USERNAME instead OF EMAIL
    if(!user)
        user = await User.findOne({ username:email })
    

    if(!user){

        return res.status(401).json({msg:'يوجد غلط في البريد الالكتوني او كلمة المرور'})

    }


    const match = await bcrypt.compare(password, user.password);

    const{_id,username}=user

    console.log(_id,username)

    if(match){
        const token=await createToken(_id)
        console.log(user)

        return res.json({token,username})

    }

    return res.status(401).json({msg:'يوجد غلط في البريد الالكتوني او كلمة المرور'})




}

const registration=async(req,res,next)=>{
    const{email,password,username}=req.body
    


    const hasedPassword=await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password:hasedPassword
    });


    res.status(201).json({msg:"تم التسجيل بنجاح"})





}


module.exports={
    login,
    registration

}