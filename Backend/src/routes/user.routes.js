import express from 'express';
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/user.controller';
import upload from '../config/multer.config';

const  router = express.Router();

// Get user data
router.get('/user', getUserData)

//Apply for a job
router.post('/apply', applyForJob)

//Get applied jobs data
router.get('/applications', getUserJobApplications)

//updateuser profile (resume)
router.get('/user', upload.single('resume'), updateUserResume)   


export default router;