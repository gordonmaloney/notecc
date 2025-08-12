import React from "react";
import Header from "./Header";
import Landing from "./Landing";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import Report from "./Report";
import Repairs from "./Repairs";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/report" element={<Report />} />
          <Route path="/repairs" element={<Repairs />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
