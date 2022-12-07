

const profile=(req,res)=>{


    const userInfo=req.user

    res.json(userInfo)

}

module.exports ={ profile};
