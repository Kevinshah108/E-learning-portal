import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const WelcomePage = () => {
  const navigate = useNavigate()
  const { authStudent } = useAuthStore()
  const fullName = authStudent?.fullName || "Guest"
  const welcomeText = `Hello, ${fullName} !👋`

  const handleGoToDashboard = () => {
    navigate('/')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-sky-100 via-indigo-100 to-sky-200 text-center px-4'>
      <h1
        className='text-4xl font-bold text-slate-800 mb-4 whitespace-nowrap overflow-hidden'
        style={{
          width: `${welcomeText.length + 1}ch`,
          animation: 'typingEffect 3s steps(40, end) forwards',
          borderRight: '2px solid #4f46e5'
        }}
      >
        {welcomeText}
      </h1>

      <p
        className='text-xl text-slate-700 bg-white bg-opacity-70 px-8 py-4 rounded-xl shadow-md mb-6 max-w-xl opacity-0'
        style={{
          animation: 'fadeIn 1.5s ease-in 3s forwards'
        }}
      >
        Welcome to the <span className='font-semibold text-indigo-700'>Mini Learning Portal</span> 🎓
      </p>

      <button
        onClick={handleGoToDashboard}
        className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300'
      >
        Go to Dashboard
      </button>

      <style>
        {`
          @keyframes typingEffect {
            from { width: 0; border-right-color: #4f46e5; }
            to { width: ""; border-right-color: transparent; }
          }

          @keyframes fadeIn {
            to { opacity: 1 }
          }
        `}
      </style>
    </div>
  )
}

export default WelcomePage
