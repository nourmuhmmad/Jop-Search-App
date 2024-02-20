import mongoose from "mongoose";

const schema = new mongoose.Schema({
    resume: String,
    userSoftSkills: String,
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: 'job'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })


export const applicationModel = mongoose.model('application', schema)