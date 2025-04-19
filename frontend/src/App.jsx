import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import WelcomePage from './pages/WelcomePage'
import CourseDetails from './pages/CourseDetails'
import CoursePage from './pages/CoursePage'

const App = () => {
  const { authStudent, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authStudent});

  if(isCheckingAuth && !authStudent) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  

  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path='/' element={authStudent ? <Dashboard/> : <Navigate to="/login"/>}/>
        <Route path='/welcome' element={authStudent ? <WelcomePage/> : <Navigate to="/"/>}/>
        <Route path='/signup' element={!authStudent ? <SignUpPage/> : <Navigate to="/welcome"/>}/>
        <Route path='/login' element={!authStudent ? <LoginPage/> : <Navigate to="/welcome"/>}/>
        <Route path='/courses/:courseId' element={authStudent ? <CourseDetails/> : <Navigate to="/login"/>}/>
        <Route path='/coursepage' element={authStudent ? <CoursePage/> : <Navigate to="/login"/>}/>
        <Route path='/profile' element={authStudent ? <ProfilePage/> : <Navigate to="/login"/>}/>
        </Routes>

        <Toaster/>
    </div>
  )
}

export default App