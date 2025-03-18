import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // HashRouter 사용
import Nav from "./pages/Nav";
import Home from "./pages/Home"
import About from "./pages/About";
import Nomal from "./pages/Nomal";
import Render from "./pages/Render";
import Feedback from "./pages/Feedback";
import Meeting from "./pages/Meeting";
import Bottom from "./pages/Bottom";
import Source from "./pages/Source";
import "./index.css";  // TailwindCSS 및 애니메이션 적용된 CSS 파일

function SplashScreen() {
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowFullText(true);
    }, 1500); // 'ST'가 나타나고 'SilentTalk'로 변하는 시간
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <h1 className={`text-7xl font-bold text-white ${showFullText ? 'animate-expand' : ''}`}>
        {showFullText ? "SilentTalk" : "ST"}
      </h1>
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
