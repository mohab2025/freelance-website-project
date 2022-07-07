const mongoose = require('mongoose');

// const dateSchema = require('./date.model');

const educationSchema = new mongoose.Schema({
    organization: {
        required: true,
        minLength: 3,
        type: String,
    },
    degree:{
        required: true,
        minLength: 3,
        type: String,
    },
    areaOfStudy:{
        type: String,
        minLength: 5,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date
    },
    description:{
        type: String,
        minLength: 100,
        maxLength: 500
    },
    index: {
        type: Number
    }
},{_id: false});

module.exports = educationSchema;