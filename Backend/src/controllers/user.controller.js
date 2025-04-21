import { JobApplication } from "../models/jobApplication.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";

//get user data
const getUserData = asyncHandler(async (req, res) => {
    const userId = req.auth.userId

    try {
        const user = await User.findById(userId).select('-password -__v -createdAt -updatedAt')

        if (!user) {
          throw new ApiError(404, "User not found")
        }

        return res.json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// apply for a job
const applyForJob = asyncHandler(async (req, res) => {

    const {jobId} = req.body
    const userId = req.auth.userId

    try {
        const isAlreadyApplied = await JobApplication.find({userId, jobId})

        if(isAlreadyApplied.length > 0) {
            throw new ApiError(400, "You have already applied for this job")
        }

        const jobData = await Job.findById(jobId)

        if(!jobData) {
            throw new ApiError(404, "Job not found")
        }

        await JobApplication.create({
            userId,
            jobId,
            companyId: jobData.companyId,
            date: Date.now()
        })

        return res.status(201).json({
            success: true,
            message: "Applied for job successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

})

// get user applied applications
const getUserJobApplications = asyncHandler(async (req, res) => {
    try {
        
        const userId = req.auth.userId

        const jobApplications = await JobApplication.find({userId}).populate('jobId', 'title description location level category salary').populate('companyId', 'name email image').exec()

        if(!jobApplications) {
            throw new ApiError(404, "No job applications found")
        }

        return res.status(200).json({
            success: true,
            jobApplications
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

//update user profile (resume)
const updateUserResume = asyncHandler(async (req, res) => {
    try {
        const userId = req.auth.userId
        const resume = req.file

        const userData = await User.findById(userId)

        if(resume) {
            const resumeUpload = await cloudinary.uploader.upload(resume.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.status(200).json({
            success: true,
            message: "Resume updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export {
    getUserData,
    applyForJob,
    getUserJobApplications,
    updateUserResume
}

