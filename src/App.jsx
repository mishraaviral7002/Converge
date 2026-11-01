import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import About from './HomePage/Components/AboutPage/About.jsx';
import Contact from './HomePage/Components/ContactPage/Contact.jsx'
import Register from './HomePage/Components/Register/Register.jsx';
import Login from './HomePage/Components/Login/Login.jsx';
import Canvas from "./Canvas/Canvas.jsx";
import DashBoard from './DashBoardPage/DashBoard.jsx';
function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/About" element={<About/>} />
            <Route path="/Contact" element={<Contact/>} />
            <Route path="/canvas" element={<Canvas/>} />
            <Route path="/dashboard" element={<DashBoard/>} />
          </Routes>
        </BrowserRouter>

      </>
  );
}

export default App;