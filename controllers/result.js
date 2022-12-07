
const Result= require("../model/Result")

const limit=12

const getResultsByName=async(req,res)=>{


    let {name,page,sort}=req.query

    console.log(name,page)
    page=page || 1
    const{by,order}=sort || {}  

    const skip=(page-1)*limit
    
    const regex = new RegExp(name, 'i')
    const lenOfReslts=await Result.find({'studentInfo.name':{$regex: regex}}).countDocuments()

    if(!lenOfReslts){
        return res.status(404).json({msg:"لا توجد نتيجه بهذا الاستعلام"})
    }
    try{
        
        let resultsByName= (by && order) 
            ? await Result.find({"studentInfo.name":{$regex: regex}}).skip(skip).limit(limit).sort({[`studentInfo.${by}`]:Number(order)}).select("-_id").lean()
            : await Result.find({"studentInfo.name":{$regex: regex}}).skip(skip).limit(limit).select("-_id").lean()

        res.json({lenOfReslts,limit,data:resultsByName})
    }
    catch(err){
        return res.status(405).json({err:err})
    }

}

const getResultsBySittingNumber=async(req,res)=>{

    let {number}=req.params

    const student=await Result.findOne({"studentInfo.sittingNumber":number}).select("-_id").lean()

    if(!student){
        return res.status(404).json({msg:"No Result Found"})
    }

    return res.json({data:student})


}

const getResultsBySchool=async(req,res)=>{

    let {name,page,sort}=req.query


    page=page || 1
    const{by,order}=sort || {}
    const skip=(page-1)*limit


    const regex = new RegExp(name, 'i')
    const lenOfReslts=await Result.find({"studentInfo.school":{$regex: regex}}).countDocuments()

    if(!lenOfReslts){
        return res.status(404).json({msg:"No Result Found"})
    }

    let resultsByName= (by && order) 
        ? await Result.find({"studentInfo.school":{$regex: regex}}).skip(skip).limit(limit).sort({[`studentInfo.${by}`]:order}).select("-_id").lean()
        : await Result.find({"studentInfo.school":{$regex: regex}}).skip(skip).limit(limit).select("-_id").lean()



    return res.json({lenOfReslts,limit,data:resultsByName})

}

const getResultsByAdministration=async(req,res)=>{

    let {name,page,sort}=req.query


    page=page || 1

    const{by,order}=sort || {}
    const skip=(page-1)*limit


    const regex = new RegExp(name, 'i')
    const lenOfReslts=await Result.find({"studentInfo.educationalAdministration":{$regex: regex}}).countDocuments()

    if(!lenOfReslts){
        return res.status(404).json({msg:"No Result Found"})
    }

    let resultsByName= (by && order) 
        ? await Result.find({"studentInfo.educationalAdministration":{$regex: regex}}).skip(skip).limit(limit).sort({[`studentInfo.${by}`]:order}).select("-_id").lean()
        : await Result.find({"studentInfo.educationalAdministration":{$regex: regex}}).skip(skip).limit(limit).select("-_id").lean()


    return res.json({lenOfReslts,limit,data:resultsByName})



}

module.exports={
    getResultsByName,
    getResultsBySittingNumber,
    getResultsBySchool,
    getResultsByAdministration
}