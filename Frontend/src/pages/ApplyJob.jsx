import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import kConvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'

const ApplyJob = () => {

  const { id } = useParams()

  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null)

  const { jobs, backendUrl, userData, userApplications } = useContext(Appcontext)

  const fetchJob = async () => {
   try {
     const {data} = await axios.get(backendUrl+`/api/jobs/${id}`)

    if(data.success){
      setJobData(data.job)
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
  }

  const applyHandler = async () => {
    try {
      if(!userData){
        return toast.error('Login to apply for jobs')
      }

      if(!userData.resume){
        navigate('/application')
        return toast.error('upload resume to apply')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { 
      fetchJob()
  }, [id])
  

  return jobData ? (
    <>
    <Navbar/>
    <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
      <div className='bg-white text-black rounded-lg w-full'>
        <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
          <div className='flex flex-col md:flex-row items-center'>
            <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={assets.company_icon} alt="" />
            <div className='text-center md:text-left text-neutral-700'>
              <h1 className='text-2xl sm:text-4xl font-medium'>{jobData.title}</h1>
              <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                <span className='flex items-center gap-1'>
                  <img src={assets.suitcase_icon} alt="" />
                  {jobData.companyId.name}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.location_icon} alt="" />
                  {jobData.location}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.person_icon} alt="" />
                  {jobData.level}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.money_icon} alt="" />
                  CTC: {kConvert.convertTo(jobData.salary)}
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-col justify-center text-end text-sm max-md:text-center'>
              <button onClick={applyHandler} className='bg-blue-600 p-2.5 px-10 text-white rounded cursor-pointer'>Apply Now</button>
              <p className='mt-1 text-gray-600'>Posted {moment(jobData.Date).fromNow()}</p>
          </div>

        </div>

        <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3 '>
              <h2 className='font-bold text-2xl mb-4'>Job Description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{__html:jobData.description}}></div>
              <button onClick={applyHandler} className='bg-blue-600 p-2.5 px-10 text-white rounded mt-10 cursor-pointer'>Apply Now</button>
            </div>

            {/**right section more jobs */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
                <h2>More jobs from {jobData.companyId.name}</h2>
                {jobs.filter( job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id).filter(job => true).slice(0, 4).map((job, index) => <JobCard key={index} job={job}/>)}
            </div>
        </div>


      </div>
    </div>
    <Footer/>
    </>
  ) : (
    <Loading/>
  )
}

export default ApplyJob