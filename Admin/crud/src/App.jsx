import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cars from './Cars'
import CreateCar from './CreateCar'
import UpdateCar from './UpdateCar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Cars />}></Route>
          <Route path='/create' element={<CreateCar />}></Route>
          <Route path='/update/:id' element={<UpdateCar />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
