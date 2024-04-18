import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/register.jsx';
import Login from './components/login.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import { BrowserRouter,Routes , Route } from 'react-router-dom';
import NavBar from './components/navBar.jsx';
import Footer from './components/footer.jsx';
import "./App.css";
function App() {
  

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/register" element={<Register />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/AdminPanel" element={<AdminDashboard />} ></Route>
        </Routes>
        <Footer />
        <div className="copyRight"> &copy; 2024 Your Company Name</div>
      </div>
    </BrowserRouter>
  )
}

export default App
