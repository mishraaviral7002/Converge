import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import About from './AboutPage/About.jsx';
import Contact from './ContactPage/Contact.jsx'


function App() {
  return (
      <>
        <BrowserRouter>
          <nav>
            <Link to="/">Home Page</Link> |{' '}
            <Link to="/about">About Page</Link> |{' '}
            <Link to="/contact">Contact</Link> |
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;