import mongoose from "mongoose";

const schema = new mongoose.Schema({
    companyName: {
        type: String,
        require: true,
        unique: [true, 'Email is required'],
        minLength: [2, 'too short password']
    },
    description: {
        type: String,
        require: true,
    },
    industry: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    numOfEmployees: {
        type: Number,
    },
    email: {
        type: String,
        require: true,
        unique: [true, 'Email is required'],
    },
    companyHr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    companyOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })


export const companyModel = mongoose.model('company', schema)