import React from "react";
import Header from "./Components/Header";
import Landing from "./Pages/Landing";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import Report from "./Pages/Report";
import Repairs from "./Pages/Repairs";
import Footer from "./Components/Footer";
import TolerableStandard from "./Pages/TolerableStandard";
import FPP from "./Pages/FPP";
import ScrollToTop from "./Components/ScrollToTop";
import TheCampaign from "./Pages/TheCampaign";
import Powers from "./Pages/Powers";

const App = () => {


  
  return (
    <div className="page">
      <Router>
        <ScrollToTop />

        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="/report" element={<Report />} />
            <Route path="/repairs" element={<Repairs />} />

            <Route path="/tolerable" element={<TolerableStandard />} />
            <Route path="/fpp" element={<FPP />} />

            <Route path="/campaign" element={<TheCampaign />} />
            <Route path="/powers" element={<Powers />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
