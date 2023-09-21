import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Speed from './pages/Speed'
import Map2 from './components/Map2'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
{/*           <Route exact path='/' element={<Map2 />} /> */}
          <Route exact path='/speedometer' element={<Speed />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
