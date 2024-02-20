import joi from "joi";

const addJobVal = joi.object({
    jobTitle : joi.string().min(2).max(300).required(),
    description : joi.string().min(2).max(300).required(),
    techSkills : joi.string().min(2).max(300).required(),
    softSkills : joi.string().min(2).max(300).required(),
    jobLocation: joi.string().valid("onsite", "remotely","hybrid"),
    workingtime: joi.string().valid("partTime", "fullTime"),
    seniorityLevel: joi.string().valid("junior", "midLevel","senior","teamLead","cto"),
    companyId:joi.string().hex().length(24).required(),
    createdBy: joi.string().hex().length(24),
}) 

const updateJobVal = joi.object({
    jobTitle : joi.string().min(2).max(300),
    description : joi.string().min(2).max(300),
    techSkills : joi.string().min(2).max(300),
    softSkills : joi.string().min(2).max(300),
    jobLocation: joi.string().valid("onsite", "remotely","hybrid"),
    workingtime: joi.string().valid("partTime", "fullTime"),
    seniorityLevel: joi.string().valid("junior", "midLevel","senior","teamLead","cto"),    
}) 

const paramIdVal = joi.object({
    id: joi.string().hex().length(24),
});

const addAppVal = joi.object({
    jobId: joi.string().hex().length(24),
    userId: joi.string().hex().length(24),
    userSoftSkills:joi.string().min(2).max(300),
});

export {
    addJobVal,
    paramIdVal,
    updateJobVal,
    addAppVal
}
