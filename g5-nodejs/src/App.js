import logo from "./logo.svg";
import "./App.css";
import NewReleasedCars from "./components/newReleased";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <NewReleasedCars />
      <Footer />
      <div className="copyRight"> &copy; 2024 Your Company Name</div>
    </div>
  );
}

export default App;
