import express from 'express';
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/company.controller.js';
import upload from '../config/multer.config.js';
import companyAuthMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register',upload.single('image'), registerCompany)

router.post('/login', loginCompany)

router.get('/company',companyAuthMiddleware, getCompanyData)

router.post('/post-job', companyAuthMiddleware, postJob)

router.get('/applicants', companyAuthMiddleware, getCompanyJobApplicants)

router.get('/list-jobs', companyAuthMiddleware, getCompanyPostedJobs)

router.post('/change-status', companyAuthMiddleware, changeJobApplicationStatus)

router.post('/change-visibility',companyAuthMiddleware, changeVisibility)


export default router;