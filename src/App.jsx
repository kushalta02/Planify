import { useState } from 'react'
import Calender from './components/Calender.jsx'
import './App.css'
import React from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center">
      <h1 className="text-5xl font-bold text-purple-500">
        Tailwind is working 🚀
      </h1>
    </div>
      {/* <h2>TESTING</h2> */}
      <Calender />
        
    </>
  )
}

export default App
