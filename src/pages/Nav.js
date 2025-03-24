import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const videoSources = ["/images/b.mp4", "/images/c.mp4", "/images/a.mp4"];

const Nav = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const videoRef = useRef(null);
  const menuRef = useRef(null); // 📌 메뉴 영역 감지를 위한 ref 추가
  const location = useLocation();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.error("자동 재생 오류:", error));
    }
  }, [currentVideo]);

  const handleVideoEnd = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentVideo((prev) => (prev + 1) % videoSources.length);
      setIsFading(false);
    }, 500);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setIsMenuActive((prev) => !prev);

    if (!isOpen) {
      window.scrollTo(0, 0);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsMenuActive(false);
  };

  // 📌 메뉴 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (location.pathname !== "/") {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, [location]);

  const textColor = location.pathname === "/" ? "text-white" : "text-black";
  const navHeight = location.pathname === "/" ? "h-screen" : "h-[80px]";

  return (
    <nav
      className={`relative p-4 transition-all duration-300 ${
        isMobile
          ? "w-screen flex flex-col items-start"
          : "flex justify-between items-center bg-gray-100 shadow-md px-8 fixed top-0 left-0 right-0 z-50"
      } ${isMenuActive ? "bg-white" : ""} ${navHeight}`}
    >
      {!isMenuActive && location.pathname === "/" && (
        <div className="absolute inset-0 w-screen h-screen">
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            src={videoSources[currentVideo]}
            autoPlay
            muted
            loop={false}
            onEnded={handleVideoEnd}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {isMenuActive && <div className="absolute inset-0 bg-white"></div>}

      {isMobile ? (
        <>
          <div className="w-full flex justify-between items-center relative z-10">
            <button
              onClick={toggleMenu}
              className={`fixed top-0 right-0 text-3xl p-5 ${
                location.pathname !== "/" ? "text-black" : "text-white"
              }`}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <Link
            to="/"
            className={`fixed top-0 text-3xl font-bold p-5 ${
              location.pathname === "/" ? "text-white" : "text-black"
            }`}
          >
            SilentTalk
          </Link>

          {/* 📌 메뉴 전체를 감싸는 div에 ref 추가 */}
          {isOpen && (
            <div ref={menuRef} className="absolute top-0 right-0 w-full mt-4 bg-white shadow-md z-20">
              <div className="text-right">
                <Link to="/RealRender" onClick={closeMenu} className="p-4 block border-b border-black text-black hover:text-blue-500">
                  실시간 번역
                </Link>
                <Link to="/Render" onClick={closeMenu} className="p-4 block border-b border-black text-black hover:text-blue-500">
                  수어 영상 번역
                </Link>
                <Link to="/Nomal" onClick={closeMenu} className="p-4 block border-b border-black text-black hover:text-blue-500">
                  등록된 수어
                </Link>
                <Link to="/Feedback" onClick={closeMenu} className="p-4 block border-b border-black text-black hover:text-blue-500">
                  수어 피드백
                </Link>
                <Link to="/Meeting" onClick={closeMenu} className="p-4 block border-b border-black text-black hover:text-blue-500">
                  화상 회의
                </Link>
                <Link to="/About" onClick={closeMenu} className="p-4 items-center block border-b-0 text-black hover:text-blue-500">
                  <FontAwesomeIcon icon={faCircleInfo} className="mr-1" />
                  소개
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-between items-center w-full z-10 fixed top-0 left-0 right-0 p-5 border-b border-white">
          <Link to="/" className={`text-3xl font-bold ${textColor} hover:text-blue-500`}>
            SilentTalk
          </Link>
          <div className="flex space-x-8">
            <Link to="/Render" className={`text-lg font-semibold ${textColor} hover:text-blue-500`}>
              수어 영상 번역
            </Link>
            <Link to="/Nomal" className={`text-lg font-semibold ${textColor} hover:text-blue-500`}>
              등록된 수어
            </Link>
            <Link to="/Feedback" className={`text-lg font-semibold ${textColor} hover:text-blue-500`}>
              수어 피드백
            </Link>
            <Link to="/Meeting" className={`text-lg font-semibold ${textColor} hover:text-blue-500`}>
              화상 회의
            </Link>
            <Link to="/About" className={`text-lg font-semibold ${textColor} hover:text-blue-500 flex items-center`}>
              <FontAwesomeIcon icon={faCircleInfo} className="mr-1" />
              소개
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
