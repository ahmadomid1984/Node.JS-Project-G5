import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/register.jsx';
import Login from './components/login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar.jsx';
import Footer from './components/footer.jsx';
import "./App.css";
import Cars from "../../../Admin/crud/src/Cars";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Register />} /> {/* Root path set to Register */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
        <Footer />
        <div className="copyRight"> &copy; 2024 Your Company Name</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
