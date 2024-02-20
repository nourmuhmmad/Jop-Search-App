import express from "express"
import { auth } from "../../midleware/auth.js"
import { allowedTo } from "../../midleware/alloweTo.js"
import { application, addjob, deletejob, getAllJobsOfCompany, getAllJobsWithCompanyData, getAllJobsWithFilters, updateJob } from "./jobController.js"
import { validation } from "../../midleware/validation.js"
import { addAppVal, addJobVal, paramIdVal, updateJobVal } from "./jobValidation.js"

const jobRouter = express.Router()

jobRouter
    .route('/') 
    .post(auth,allowedTo('hr'),validation(addJobVal),addjob)
    .get(auth,allowedTo('hr','user'),getAllJobsWithCompanyData)

jobRouter
    .route('/getAllJobsOfCompany')
    .get(auth,allowedTo('user','hr'),getAllJobsOfCompany)
    
jobRouter
    .route('/getAllJobsWithFilters')
    .get(auth,allowedTo('user','hr'),getAllJobsWithFilters)
    
jobRouter
    .route('/:id') 
    .put(auth,allowedTo('hr'),validation(updateJobVal),updateJob)
    .delete(auth,allowedTo('hr'),validation(paramIdVal),deletejob)
    .post(auth,allowedTo('user'),validation(addAppVal,paramIdVal),application)


export default jobRouter