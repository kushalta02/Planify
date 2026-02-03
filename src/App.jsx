import { useState } from 'react'
import Calender from './components/Calender.jsx'
import './App.css'
import React from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      {/* <h2>TESTING</h2> */}
      <Calender />
        
    </>
  )
}

export default App
