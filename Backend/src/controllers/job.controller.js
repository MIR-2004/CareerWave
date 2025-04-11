import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all jobs 

const getJobs = asyncHandler(async (req, res) => {
    try {
        const jobs = await Job.find({visible: true}).populate({path: "companyId", select:'-password'})

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
        const {id} = req.params;

        const singleJob = await Job.findById(id).populate({path: "companyId", select:'-password'})
        if(!singleJob){
            throw new Error("Job not found")
        }

        res.json({
            success: true,
            singleJob
        })

        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }
});

export {
    getJobs,
    getJobById
}