
const { check } = require('express-validator');

const Result=require("../../model/Result")

const validatorMiddleware =require("../../middlewares/validatorMiddleware")

exports.getResultsByName=[
    check('name')
        .notEmpty()
        .withMessage('name required'),

    check('sort')
        .optional({checkFalsy: false})
        .isObject() 
        .withMessage('Write Vaild Data'),
        /*.custom(({by,order}) =>{
            if(by && order )
                return true
            return false
        })

        .withMessage('Write Vaild Data ya khor'),*/

    check('page')
        .optional({checkFalsy: true})
        .isInt()
        .withMessage('Write Vaild Data ya khol'),

    validatorMiddleware,

]

exports.getResultsBySittingNumber=[
    check('number')
        .notEmpty()
        .withMessage('رقم الجلوس او الاسم مطلوب')
        .isInt()
        .withMessage('Write Vaild Data'),

    validatorMiddleware,

]

exports.getResultsBySchool=[

    check('name')
    .notEmpty()
    .withMessage('name required'),

    check('sort')
        .optional({checkFalsy: true})
        .isObject() 
        .withMessage('Write Vaild Data')
        .custom(({by,order}) =>{
            if(by && order )
                return true
            return false
        })

        .withMessage('Write Vaild Data'),

    check('page')
        .optional({checkFalsy: true})
        .isInt()
        .withMessage('Write Vaild Data'),

    validatorMiddleware,


]

exports.getResultsByAdministration=[

    check('name')
    .notEmpty()
    .withMessage('name required'),

    check('sort')
        .optional({checkFalsy: true})
        .isObject() 
        .withMessage('Write Vaild Data')
        .custom(({by,order}) =>{
            if(by && order )
                return true
            return false
        })

        .withMessage('Write Vaild Data'),

    check('page')
        .optional({checkFalsy: true})
        .isInt()
        .withMessage('Write Vaild Data'),

    validatorMiddleware,


]

