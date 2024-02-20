import joi from "joi";

const addUserVal = joi.object({
    firstName : joi.string().min(2).max(300).required().trim(),
    lastName : joi.string().min(2).max(300).required().trim(),
    userName : joi.string().min(2).max(300).required().trim(),
    email : joi.string().email().required(),
    recoverEmail : joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(4).required(),
    role: joi.string().valid("user", "hr").required(),
    mobile: joi.number().integer().required(),   
    status: joi.string().valid("online", "offline"),
    dob : joi.date()

}) 

const signinVal = joi.object({
    email : joi.string().email(),
    mobile: joi.number().integer(),  
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(4).required(),
})

const paramIdVal = joi.object({
    id: joi.string().hex().length(24),
  });

const changePasswordVal = joi.object({
    currntpassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(4).required(),
    newpassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(4).required(),
})

const updateAccountVal = joi.object({
    firstName : joi.string().min(2).max(300).trim(),
    lastName : joi.string().min(2).max(300).trim(),
    userName : joi.string().min(2).max(300).trim(),
    email : joi.string().email(),
    recoverEmail : joi.string().email(),
    mobile: joi.number().integer(),   
    dob : joi.date()
}) 


export {
    addUserVal,
    paramIdVal,
    signinVal,
    updateAccountVal,
    changePasswordVal,
}