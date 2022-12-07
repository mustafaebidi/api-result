const express = require('express');
const router = express.Router();
const Controller = require('../controllers/result');

const Vaildator=require("../utils/vaildator/result")

router.get('/getByName', Vaildator.getResultsByName, Controller.getResultsByName);

router.get('/getBySittingNumber/:number',Vaildator.getResultsBySittingNumber,Controller.getResultsBySittingNumber);

router.get('/getBySchool',Vaildator.getResultsBySchool ,Controller.getResultsBySchool);

router.get('/getByAdministration',Vaildator.getResultsByAdministration ,Controller.getResultsByAdministration);





module.exports = router;
