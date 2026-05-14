import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Encode from "./pages/Encode";
import Decode from "./pages/Decode";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Vault from "./pages/Vault";
import About from "./pages/About";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/encode" element={<Encode />} />
        <Route path="/decode" element={<Decode />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
         <Route path="/vault" element={<Vault />} />
        <Route path="/about" element={<About />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;