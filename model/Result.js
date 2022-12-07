const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Result= require("../model/Result")

const resultSchema  = new Schema({
    studentInfo: {
    },
    calculatedGrades: {
    },

    unCalculatedGrades: {
    },

},{ collection : 'results' });

module.exports = mongoose.model('Result', resultSchema);