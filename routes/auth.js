const express = require('express');
const router = express.Router();
const Controller = require('../controllers/auth');
const Vaildator=require("../utils/vaildator/auth")


router.post('/login',Vaildator.login,Controller.login );

router.post('/registration', Vaildator.registration,Controller.registration);




    
module.exports = router;
