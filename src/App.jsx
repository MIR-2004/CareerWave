import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin'
import { Appcontext } from './context/Appcontext'

const App = () => {
  const {showRecruiterLogin} = useContext(Appcontext)
  return (
    <div>
      {showRecruiterLogin ? <RecruiterLogin /> : null}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/apply-job/:id' element={<ApplyJob/>} />
        <Route path='/application' element={<Application/>} />
      </Routes>
    </div>
  )
}

export default App