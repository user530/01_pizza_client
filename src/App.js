import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={"HOME PAGE"} />
        <Route path="/menu" element={"STORE MAIN PAGE"} />
        <Route path="/menu/:category" element={"{CATEGORY} STORE PAGE"} />
        <Route path="/dostavka" element={"SHIPMENT PAGE"} />
        <Route path="/news" element={"SPECIAL OFFERS PAGE"} />
        <Route path="/news/:special" element={"SINGLE SPECIAL OFFER PAGE"} />
        <Route path="/about" element={"ABOUT PAGE"} />
        <Route path="/contact" element={"CONTACT PAGE"} />
        <Route path="*" element={"404 PAGE"} />
      </Routes>
    </Router>
  );
}

export default App;
