
const { check } = require('express-validator');

const User=require("../../model/User")

const validatorMiddleware=require("../../middlewares/validatorMiddleware")

exports.login=[
    check('email')
        .notEmpty()
        .withMessage('Email required'),


    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),



    validatorMiddleware,

]

exports.registration=[
    check('username')
        .notEmpty(),

    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) =>
            User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error('E-mail already in user'));
            }
            })
        ),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    validatorMiddleware,

]