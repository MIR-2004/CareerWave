import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Get all jobs 

const getJobs = asyncHandler(async (req, res) => {
    try {
        const jobs = await Job.find({visible: true}).populate({path: "companyId", select:'-password'})
        if(!jobs){
            throw new Error("No jobs found")
        }
        res.json({
            success: true,
            jobs
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})


// Get single job by id
const getJobById = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params

        const job = await Job.findById(id).populate({path: "companyId", select:'-password'})
        if(!job){
            throw new Error("Job not found")
        }
        res.json({
            success: true,
            job
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
export {
    
    getJobById,
    getJobs
}