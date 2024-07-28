import React from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Types from "./pages/Types";
import Affiche from "./pages/Affiche";
import Matieres from "./pages/Matieres";


function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Matiere/:semestre" element={<Matieres />} />
          <Route path="/dev" element={<Types />} />
          <Route path="/affiche" element={<Affiche />} />


          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
