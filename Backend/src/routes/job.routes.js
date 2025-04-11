import express from 'express';
import { getJobById, getJobs } from '../controllers/job.controller.js';

const router = express.Router();

//Routes for all jobs data
router.get('/', getJobs)
//Routes to get a single job data
router.get('/:id', getJobById)

export default router;