import joi from "joi";

const addCompanyrVal = joi.object({
    companyName: joi.string().min(2).max(300).required().trim(),
    description: joi.string().min(2).max(300).required(),
    industry: joi.string().min(2).max(300).required(),
    address: joi.string().min(2).max(300).required(),
    numOfEmployees: joi.number().integer().positive().min(10).max(100).required(),
    email: joi.string().email().required(),
    companyOwner: joi.string().hex().length(24),
})

const updateCompanyVal = joi.object({
    companyName: joi.string().min(2).max(300),
    description: joi.string().min(2).max(300),
    industry: joi.string().min(2).max(300),
    address: joi.string().min(2).max(300),
    numOfEmployees: joi.number().integer().positive().min(10).max(100),
    email: joi.string().email(),
})

const paramIdVal = joi.object({
    id: joi.string().hex().length(24),
});

export {
    addCompanyrVal,
    updateCompanyVal,
    paramIdVal
}