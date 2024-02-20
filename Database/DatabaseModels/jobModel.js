import mongoose from "mongoose";

const schema = new mongoose.Schema({
    jobTitle: {
        type: String,
        require: true,
        unique: [true, 'jobTitle is required'],
        minLength: [2, 'too short password']
    },
    jobLocation: {
        type: String,
        enum: ["onsite", "remotely", "hybrid"],
    },
    workingtime: {
        type: String,
        enum: ["partTime", "fullTime"],
    },
    seniorityLevel: {
        type: String,
        enum: ["junior", "midLevel", "senior", "teamLead", "cto"],
    },
    description: {
        type: String,
        require: true,
    },
    techSkills: String,
    softSkills: String,
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: 'company'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })


export const jobModel = mongoose.model('job', schema)