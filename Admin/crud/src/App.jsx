import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cars from './Cars'
import CreateCar from './CreateCar'
import UpdateCar from './UpdateCar'
import Features from './Features'
import Register from './components/register.jsx';
import Login from './components/login.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} /> {/* Root path set to Register */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/cars' element={<Cars />}></Route>
          <Route path='/create' element={<CreateCar />}></Route>
          <Route path='/update/:id' element={<UpdateCar />}></Route>
          <Route path='/features/:id' element={<Features />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
