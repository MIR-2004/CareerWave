import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Company } from "../models/company.model.js";
import bcrypt from "bcrypt"
import { v2 as cloudinary} from "cloudinary"
import generateToken from "../utils/generateToken.js";
import { Job } from "../models/job.model.js";


// register company
const registerCompany = asyncHandler( async(req, res) => {
    
    const {name , email, password} = req.body

    const imageFile = req.file

    if([name, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "Name Email and Password are required")
    }

    if (!imageFile) {
        throw new ApiError(400, "Image is required")
    }
   

    try {
        const companyExists = await Company.findOne({email})

        if(companyExists) {
            throw new ApiError(400, "Company Already exist")
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        if (!imageUpload) {
            throw new ApiError(500, "Failed to upload image on cloudinary")
        }

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        //console.log(company)

        const createdCompany = await Company.findById(company._id).select(
            "--password"
        )
        
        if (!createdCompany) {
            throw new ApiError(500, "Failed to send the data to database")
        }

        res.status(200).json({
            success: true,
            company: createdCompany,
            token: generateToken(company._id)
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


})


// login company
const loginCompany = asyncHandler( async(req, res) => {
   const {email, password} = req.body

   if ([email, password].some(field => field?.trim() === "")) {
    throw new ApiError(400, "Email and Password are required")
   }

   try {
        const company = await Company.findOne({email})

        if (bcrypt.compare(password, company.password)) {
           res.status(200).json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
           })
        }else{
            throw new ApiError(400, "Invalid email or password")
        }
   } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
   }
})

// get company data
const getCompanyData = asyncHandler( async(req, res) => {
   

    try {

        const company = req.company

        res.status(200).json({
            success: true,
            company
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})

// post jobs
const postJob= asyncHandler( async(req, res) => {
    const {title, description, location, salary, level, category} = req.body

    const companyId = req.company._id

    if (!companyId) {
        throw new ApiError(400, "Company not found")
        
    }
   
    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })

        await newJob.save()

        res.status(200).json({
            success: true,
            job: newJob,
            message: "Job posted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

})

// get company job applications
const getCompanyJobApplicants = asyncHandler( async(req, res) => {
   
})

//get company posted jobs
const getCompanyPostedJobs = asyncHandler( async(req, res) => {
   try {
    const companyId = req.company._id

    const jobs = await Job.find({companyId})

    res.status(200).json({
        success: true,
        jobs
    })
   } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
})

//change job application status
const changeJobApplicationStatus = asyncHandler( async(req, res) => {
   
})


//change job visibility
const changeVisibility = asyncHandler( async(req, res) => {
   try {
    const jobId = req.body.id

    const comapnyId = req.company._id

    const job = await Job.findById(jobId)

    if(comapnyId.toString() === job.companyId.toString()){
        job.visible = !job.visible
    }

    await job.save()

    res.json({
        success: true,
        message: "Job visibility changed successfully"
    })
   } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
})

export {
    registerCompany,
    loginCompany,
    getCompanyData,
    postJob,
    getCompanyJobApplicants,
    getCompanyPostedJobs,
    changeJobApplicationStatus,
    changeVisibility
}