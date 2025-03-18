import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin'
import { Appcontext } from './context/Appcontext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'

const App = () => {
  const {showRecruiterLogin} = useContext(Appcontext)
  return (
    <div>
      {showRecruiterLogin ? <RecruiterLogin /> : null}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/apply-job/:id' element={<ApplyJob/>} />
        <Route path='/application' element={<Application/>} />
        <Route path='/dashboard' element={<Dashboard/>} >
          <Route path='add-job' element={<AddJob/>} />
          <Route path='manage-job' element={<ManageJobs/>} />
          <Route path='view-application' element={<ViewApplications/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App