import React from "react";
import LoginSignup from "./component/loginPage";
import Assignment from "./component/Assignment";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Router>
        <Routes>
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/" element={<LoginSignup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
