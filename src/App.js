import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Nav from "./pages/Nav";
import Home from "./pages/Home"
import About from "./pages/About";
import Nomal from "./pages/Nomal";
import Render from "./pages/Render";
import Feedback from "./pages/Feedback";
import Meeting from "./pages/Meeting";
import RealRender from "./pages/realRender";
import Bottom from "./pages/Bottom";
import Source from "./pages/Source";
import "./index.css";  // TailwindCSS 및 애니메이션 적용된 CSS 파일

function SplashScreen() {
  const [showST, setShowST] = useState(true);
  const [showSilentTalk, setShowSilentTalk] = useState(false);
  const [animateST, setAnimateST] = useState(false);
  const [animateSilentTalk, setAnimateSilentTalk] = useState(false);

  useEffect(() => {
    // ST가 1.5초 후 점점 사라짐 (페이드아웃 + 축소)
    setTimeout(() => setAnimateST(true), 1000);
    setTimeout(() => setShowST(false), 1500);

    // SilentTalk가 점점 나타남 (페이드인 + 확대)
    setTimeout(() => setShowSilentTalk(true), 1700);
    setTimeout(() => setAnimateSilentTalk(true), 1800);

    return () => {};
  }, []);

  return (
    <div className="splash-container flex items-center justify-center h-screen">
      {/* ST 텍스트 */}
      {showST && (
        <h1
          className={`text-[10vw] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 text-white ${
            animateST ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
        >
          ST
        </h1>
      )}

      {/* SilentTalk 텍스트 */}
      {showSilentTalk && (
        <h1
          className={`text-[10vw] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 text-white ${
            animateSilentTalk ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          SilentTalk
        </h1>
      )}
    </div>
  );
}


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="min-h-screen flex flex-col">
          <Nav /> {/* 네비게이션 컴포넌트 */}

          {/* 콘텐츠 영역 */}
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Nomal" element={<Nomal />} />
              <Route path="/Render" element={<Render />} />
              <Route path="/RealRender" element={<RealRender />} />
              <Route path="/Feedback" element={<Feedback />} />
              <Route path="/Source" element={<Source />} />
              <Route path="/Meeting" element={<Meeting />} />
            </Routes>
          </div>

          <Bottom /> {/* 하단 바 컴포넌트 */}
        </div>
      )}
    </Router>
  );
}

export default App;
