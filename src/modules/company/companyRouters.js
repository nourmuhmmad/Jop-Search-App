import express from "express"
import { auth } from "../../midleware/auth.js"
import { allowedTo } from "../../midleware/alloweTo.js"
import { addCompany, deleteCompanyData, getAplicationsJobs, getCompanyByName, getCompanyData, updateCompany } from "./companyController.js"
import { validation } from "../../midleware/validation.js"
import { addCompanyrVal, paramIdVal, updateCompanyVal } from "./companyValidation.js"

const companyRouter = express.Router()

companyRouter
    .route('/')
    .post(auth, allowedTo('hr'), validation(addCompanyrVal), addCompany)
    .get(getCompanyByName)

companyRouter
    .route('/:id')
    .put(auth, allowedTo('hr'), validation(updateCompanyVal, paramIdVal), updateCompany)
    .delete(auth, allowedTo('hr'), validation(paramIdVal), deleteCompanyData)
    .get(auth, allowedTo('hr'), validation(paramIdVal), getCompanyData)

companyRouter
    .route('/getAplicationsJobs/:id')
    .get(auth, allowedTo('hr'), validation(paramIdVal), getAplicationsJobs)

export default companyRouter