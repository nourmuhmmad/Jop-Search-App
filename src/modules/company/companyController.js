import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../midleware/catchError.js";
import { companyModel } from "../../../Database/DatabaseModels/companyModel.js";
import lodash from "lodash"
import { jobModel } from "../../../Database/DatabaseModels/jobModel.js";
import { applicationModel } from "../../../Database/DatabaseModels/applicationModel.js";

const addCompany = catchError(async (req, res) => {
    let isExist = await companyModel.findOne({ email: req.body.email })
    if (isExist) { return res.json({ message: "company already exists" }) }
    let company = new companyModel(req.body)
    company.companyOwner = req.user._id
    await company.save()
    res.json({ message: "company added succsufly", company })
})

const updateCompany = catchError(async (req, res) => {
    const companyId = req.params.id;
    const company = await companyModel.findById(companyId);
    if (company && lodash.isEqual(req.user._id, company.companyOwner)) {
        await companyModel.findByIdAndUpdate(companyId, req.body);
        return res.json({ message: "company updated successfully", company });
    }
    res.json({ message: "can't find company or you aren't the owner" });
})

const deleteCompanyData = catchError(async (req, res) => {
    const companyId = req.params.id;
    const company = await companyModel.findById(companyId);
    console.log(company.companyOwner)
    if (lodash.isEqual(req.user._id, company.companyOwner)) {
        await companyModel.findByIdAndDelete(companyId);
        res.json({ message: "company deleted successfully", company });
    }

})

const getCompanyByName = catchError(async (req, res, next) => {
    let companyName = req.query.companyName;
    let company = await companyModel.find({ companyName: { $regex: new RegExp(companyName, 'i') } });
    res.json({ message: "Success", company })

})

const getAplicationsJobs = catchError(async (req, res) => {
    let job = await jobModel.findById(req.params.id)
    let company = await companyModel.findById(job.companyId)
    if (lodash.isEqual(req.user._id, company.companyOwner)) {
        let app = await applicationModel.find({ jobId: req.params.id })
        res.json({ message: "Success", app })
    }
})

const getCompanyData = catchError(async (req, res, next) => {
    const companyId = req.params.id;
    let company = await companyModel.findById(companyId);
    if (!company) {
        return res.status(404).json({ message: "Company not found" });
    }
    const jobs = await jobModel.find({ companyId: companyId });
    res.json({ message: "Success", company, jobs });
})

export {
    addCompany,
    updateCompany,
    deleteCompanyData,
    getCompanyData,
    getCompanyByName,
    getAplicationsJobs
}


