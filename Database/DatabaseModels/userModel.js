import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: [true, 'Email is required'],
    },
    recoverEmail: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [2, 'too short password']
    },
    role: {
        type: String,
        enum: ["user", "hr"],
        default: "user",
    },
    mobile: {
        type: Number,
        unique: [true, 'name is required'],
    },
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },
    dob: Date,
    passwordChangedAt: Date,

}, { timestamps: true })

schema.virtual('username').get(function () {
    return this.firstName.toLowerCase() + this.lastName.toLowerCase();
});
export const userModel = mongoose.model('user', schema)