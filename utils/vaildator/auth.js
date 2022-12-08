
const { check } = require('express-validator');

const User=require("../../model/User")

const validatorMiddleware=require("../../middlewares/validatorMiddleware")

exports.login=[
    check('email')
        .notEmpty()
        .withMessage('الاميل مطلوب'),


    check('password')
        .notEmpty()
        .withMessage('الرقم السري مطلوب')
        .isLength({ min: 6 })
        .withMessage('يجب ان تكون كلمة السر من 6 ارقام علي الاقل'),



    validatorMiddleware,

]

exports.registration=[
    check('username')
        .notEmpty(),

    check('email')
        .notEmpty()
        .withMessage('الاميل مطلوب')
        .isEmail()
        .withMessage('عنوان البريد الالكتروني غير صحيح')
        .custom((val) =>
            User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error('هذا البريد الالكتروني موجود بالفعل'));
            }
            })
        )
        .withMessage('هذا البريد الالكتروني موجود بالفعل'),


    check('password')
        .notEmpty()
        .withMessage('الرقم السري مطلوب')
        .isLength({ min: 6 })
        .withMessage('الرقم السري علي الاقل يجب ان يكون ممكون من 6 احرف'),

    validatorMiddleware,

]