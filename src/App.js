import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Header from "./components/Header";
import HeaderAlt from "./components/HeaderAlt"; // Import du Header alternatif
import Footer from "./components/Footer";
import Types from "./pages/Types";
import Affiche from "./pages/Affiche";
import Matieres from "./pages/Matieres";
import MatiereList from "./pages/MatiereList";
import AddMatiere from "./pages/AddMatiere";
import EditMatiere from "./pages/EditMatiere";
import UserListe from "./pages/UserListe";
import SujetListe from "./pages/SujetListe";

function App() {
  const location = useLocation();

  // Définir les routes pour lesquelles on souhaite utiliser le Header alternatif
  const alternateHeaderRoutes = [
    "/hhhhh",
    "/add",
    "/edit/:id",
    "/users",
    "/SujetListe",
  ];

  // Vérifier si la route actuelle correspond à une des routes alternatives
  const isAlternateHeaderRoute = alternateHeaderRoutes.some(route =>
    location.pathname.includes(route.replace(":id", ""))
  );

  return (
    <div>
      {isAlternateHeaderRoute ? <HeaderAlt /> : <Header />} {/* Utilisation du Header alternatif si la route correspond */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Matiere" element={<Matieres />} />
        <Route path="/dev" element={<Types />} />
        <Route path="/affiche" element={<Affiche />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/hhhhh" element={<MatiereList />} />
        <Route path="/add" element={<AddMatiere />} />
        <Route path="/edit/:id" element={<EditMatiere />} />
        <Route path="/users" element={<UserListe />} />
        <Route path="/SujetListe" element={<SujetListe />} />
      </Routes>
      <Footer />
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
