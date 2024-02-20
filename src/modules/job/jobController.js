import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../midleware/catchError.js";
import lodash from "lodash"
import { jobModel } from "../../../Database/DatabaseModels/jobModel.js";
import { companyModel } from "../../../Database/DatabaseModels/companyModel.js";
import { applicationModel } from "../../../Database/DatabaseModels/applicationModel.js";
import { fileUpload } from "../../servise/fileUpload/fileUpload.js";

const addjob = catchError(async (req, res) => {
    let job = new jobModel(req.body)
    job.createdBy = req.user._id
    await job.save()
    res.json({ message: "job added succsufly", job })
})

const updateJob = catchError(async (req, res) => {
    const jobId = req.params.id;
    const job = await jobModel.findByIdAndUpdate(jobId, req.body);
    if (job) return res.json({ message: "Job updated successfully", job });
    res.json({ message: "can't find company or you aren't the owner" });
})

const deletejob = catchError(async (req, res) => {
    const jobId = req.params.id;
    const job = await jobModel.findByIdAndDelete(jobId);
    res.json({ message: "company deleted successfully", job });
})

const getAllJobsWithCompanyData = catchError(async (req, res, next) => {
    let job = await jobModel.find().populate('companyId', '-_id -createdAt -updatedAt');
    res.json({ message: "Success", job })

})

const getAllJobsOfCompany = catchError(async (req, res, next) => {
    let companyName = req.query.companyName;
    let company = await companyModel.findOne({ companyName: { $regex: new RegExp(companyName, 'i') } });
    if (!company) {
        return res.status(404).json({ message: "Company not found" });
    }
    let job = await jobModel.find({ companyId: company.id })
    res.json({ message: "Success", job })

})

const getAllJobsWithFilters = catchError(async (req, res) => {
    let filter = {};
    const { workingtime, jobLocation, seniorityLevel, jobTitle, techSkills } = req.body;
    if (workingtime) filter.workingtime = workingtime;
    if (jobLocation) filter.jobLocation = jobLocation;
    if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
    if (jobTitle) filter.jobTitle = jobTitle;
    if (techSkills) filter.techSkills = techSkills;
    console.log(filter)
    const jobs = await jobModel.find(filter);
    res.json({ message: "Success", jobs });
})

const application = catchError(async (req, res) => {
    let app = new applicationModel(req.body)
    app.jobId = req.params.id
    app.userId = req.user._id
    // should upload resume here 
    await app.save()
    res.json({ message: "Application added succsufly", app })
})


export {
    addjob,
    updateJob,
    deletejob,
    getAllJobsWithCompanyData,
    getAllJobsOfCompany,
    getAllJobsWithFilters,
    application,
}