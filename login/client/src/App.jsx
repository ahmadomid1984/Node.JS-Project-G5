import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/register.jsx';
import Login from './components/login.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import { BrowserRouter,Routes , Route } from 'react-router-dom'
function App() {
  

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/AdminPanel" element={<AdminDashboard />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
