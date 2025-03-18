import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive"; // 반응형 처리를 위한 훅
import CameraComponent from "../component/Camera.js";

const Render = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 }); // 태블릿 이하 (1024px 이하)에서만 true
  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);
  const [isFullscreenCamera, setIsFullscreenCamera] = useState(false); // 카메라 화면 전체화면 상태
  const [translatedText, setTranslatedText] = useState("여기에 번역된 텍스트 표시");
  const [isBackCamera, setIsBackCamera] = useState(true); // 후면 카메라 기본 설정

  const videoContainerRef = useRef(null);
  const cameraContainerRef = useRef(null); // 카메라 화면을 위한 ref

  // 전체화면 변경 감지 이벤트
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreenCamera(!!document.fullscreenElement); // 카메라 화면 전체화면 상태 관리
      setIsFullscreenVideo(!!document.fullscreenElement); // 영상 화면 전체화면 상태 관리
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  // 전체화면 토글 함수
  const toggleFullscreen = (containerRef, isFullscreen, setIsFullscreen) => {
    if (!isFullscreen) {
      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.mozRequestFullScreen) {
          containerRef.current.mozRequestFullScreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen();
        }
      }
    } else {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8 p-6">
      
      {/* ✅ 모바일에서만 실시간 수어 번역 표시 */}
      {isMobile && (
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-3xl font-bold text-black mb-6 text-center">
            실시간 수어 번역
          </h1>

          {/* 카메라 화면 */}
          <div
            ref={cameraContainerRef}
            className="w-full h-64 bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 mx-auto relative"
          >
            <CameraComponent cameraFacing={isBackCamera ? "environment" : "user"} />
            {/* ✅ 오버레이: 전체화면에서만 보이도록 설정 */}
            {isFullscreenCamera && (
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black bg-opacity-80 text-white rounded-lg text-lg font-semibold">
                여기에 실시간 번역이 표시됩니다.
              </div>
            )}
          </div>

          {/* ✅ 카메라 화면 전체화면 버튼 */}
          <div className="text-center mb-4">
            <button
              onClick={() => toggleFullscreen(cameraContainerRef, isFullscreenCamera, setIsFullscreenCamera)}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg text-sm hover:bg-gray-600 transition-all"
            >
              {isFullscreenCamera ? "카메라 전체화면 종료" : "카메라 전체화면"}
            </button>
          </div>

          {/* 카메라 전면/후면 변경 버튼 */}
          <div className="text-center mb-4">
            <button
              onClick={() => setIsBackCamera(!isBackCamera)}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg text-sm hover:bg-gray-600 transition-all"
            >
              {isBackCamera ? "전면 카메라로 전환" : "후면 카메라로 전환"}
            </button>
          </div>

          {/* 번역 결과 */}
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md text-center border border-gray-300 mx-auto">
            <p className="text-lg font-semibold text-gray-800">번역 결과</p>
            <div className="text-xl font-bold text-black mt-2">{translatedText}</div>
          </div>
        </div>
      )}

      {/* 영상 번역 부분 (모든 화면에서 표시됨) */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">영상 번역</h1>

        {/* 영상 화면 */}
        <div
          ref={videoContainerRef}
          className="w-full max-w-2xl h-96 bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 mx-auto border-4 border-gray-500"
        >
          <span className="text-white text-lg">업로드된 영상</span>
        </div>

        {/* 전체화면 버튼 */}
        <div className="text-center mb-4">
          <button
            onClick={() => toggleFullscreen(videoContainerRef, isFullscreenVideo, setIsFullscreenVideo)}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg text-sm hover:bg-blue-600 transition-all"
          >
            {isFullscreenVideo ? "전체화면 종료" : "전체화면"}
          </button>
        </div>

        {/* 번역 결과 */}
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md text-center border border-gray-300 mx-auto">
          <p className="text-lg font-semibold text-gray-800">번역 결과</p>
          <div className="text-xl font-bold text-black mt-2">{translatedText}</div>
        </div>
      </div>
    </div>
  );
};

export default Render;
