import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const videoSources = [
  "/images/b.mp4",
  "/images/c.mp4",
  "/images/a.mp4",
]; // 🎥 여러 영상 리스트

const Nav = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isOpen, setIsOpen] = useState(false); // 메뉴 열림/닫힘 상태
  const [currentVideo, setCurrentVideo] = useState(0); // 현재 비디오 인덱스
  const [isFading, setIsFading] = useState(false); // 페이드 효과 상태
  const [isMenuActive, setIsMenuActive] = useState(false); // 메뉴 클릭 후 상태 변화
  const videoRef = useRef(null);
  const location = useLocation(); // 현재 위치 정보를 가져옵니다.

  // 🎥 비디오 변경 시 자동 재생
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.error("자동 재생 오류:", error));
    }
  }, [currentVideo]);

  // 🎥 비디오가 끝나면 자동으로 다음 비디오로 전환
  const handleVideoEnd = () => {
    setIsFading(true); // 🔹 페이드 아웃 효과
    setTimeout(() => {
      setCurrentVideo((prev) => (prev + 1) % videoSources.length); // 비디오 순차 변경
      setIsFading(false); // 🔹 새 영상으로 전환 후 페이드 인
    }, 500); // 0.5초 후 전환
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // 메뉴 열고 닫기
    setIsMenuActive((prev) => !prev); // 메뉴 활성화 상태 변경

    if (!isOpen) {
      window.scrollTo(0, 0); // 🔹 메뉴가 열릴 때 스크롤을 맨 위로 이동
    }
  };

  const closeMenu = () => {
    setIsOpen(false); // 메뉴 닫기
    setIsMenuActive(false); // 메뉴 비활성화
  };

  // 배경 색을 페이지마다 변경
  useEffect(() => {
    // 페이지가 변경될 때마다 배경을 초기화
    if (location.pathname !== "/") {
      // 페이지가 메인 홈이 아닐 경우, 배경을 하얀색으로 설정
      document.body.style.backgroundColor = "white";
    } else {
      // 메인 페이지일 경우 배경을 비디오로 설정
      document.body.style.backgroundColor = ""; // 비디오 배경으로 복귀
    }
  }, [location]);

  // 글자 색을 페이지마다 변경
  const textColor = location.pathname === "/" ? "text-white" : "text-black"; // 홈 화면은 흰색, 그 외는 검정색

  // 네비게이션 바 높이 조건 설정
  const navHeight = location.pathname === "/" ? "h-screen" : "h-[80px]"; // 홈 화면은 full 높이, 그 외는 작은 높이

  return (
    <nav
      className={`relative p-4 transition-all duration-300 ${
        isMobile
          ? "w-screen flex flex-col items-start"
          : "flex justify-between items-center bg-gray-100 shadow-md px-8 fixed top-0 left-0 right-0 z-50"
      } ${isMenuActive ? "bg-white" : ""} ${navHeight}`} // 높이를 조건부로 설정
    >
      {/* 배경 영상 */}
      {!isMenuActive && location.pathname === "/" && (  // 홈 페이지일 때만 비디오 배경
        <div className="absolute inset-0 w-screen h-screen">
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            src={videoSources[currentVideo]} // 현재 영상
            autoPlay
            muted
            loop={false}
            onEnded={handleVideoEnd} // 비디오 종료 시 handleVideoEnd 호출
          />
          <div className="absolute inset-0 bg-black/40"></div> {/* 어두운 오버레이 */}
        </div>
      )}

      {/* 메뉴가 열리면 배경이 영상이 아닌 하얀색 배경으로 변경 */}
      {isMenuActive && (
        <div className="absolute inset-0 bg-white"></div> // 메뉴가 열릴 때 배경을 하얀색으로 설정
      )}

      {isMobile ? (
        <>
          <div className="w-full flex justify-between items-center relative z-10 ">
            {/* 오른쪽으로 정렬된 메뉴 버튼 */}
            <button
            onClick={toggleMenu}
            className={`fixed top-0 right-0 text-3xl p-5 ${location.pathname !== "/" ? "text-black" : "text-white"}`}
            >
            <FontAwesomeIcon icon={faBars} />
            </button>

          </div>
          <Link
            to="/"
            className={`fixed top-0 text-3xl font-bold p-5 ${location.pathname === "/" ? "text-white" : "text-black"}`}
          >
            SilentTalk
          </Link>

          {/* 모바일에서 메뉴가 열릴 때 */}
          {isOpen && (
            <div className="absolute top-0 right-0 w-full mt-4 bg-white shadow-md z-20">
              <div className="text-right">
                <Link to="/Render" onClick={closeMenu} className="p-4 block border-b border-black text-black hover:text-blue-500">
                  수어 번역
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
        // 🖥️ 데스크탑 버전: 상단 네비게이션 메뉴
        <div className="flex justify-between items-center w-full z-10 fixed top-0 left-0 right-0 p-5 border-b border-white">
        <Link to="/" className={`text-3xl font-bold ${textColor} hover:text-blue-500`}>
            SilentTalk
        </Link>
        <div className="flex space-x-8">
            <Link to="/Render" className={`text-lg font-semibold ${textColor} hover:text-blue-500`}>
            수어 번역
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
