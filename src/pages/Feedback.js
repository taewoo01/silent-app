import React, { useRef, useState, useEffect } from "react";
import CameraComponent from "../component/Camera.js";

const Feedback = () => {
  const videoContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [translatedText, setTranslatedText] = useState("여기에 번역된 텍스트 표시");

  // 전체화면 변경 감지 이벤트
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
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
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (videoContainerRef.current) {
        if (videoContainerRef.current.requestFullscreen) {
          videoContainerRef.current.requestFullscreen();
        } else if (videoContainerRef.current.mozRequestFullScreen) {
          videoContainerRef.current.mozRequestFullScreen();
        } else if (videoContainerRef.current.webkitRequestFullscreen) {
          videoContainerRef.current.webkitRequestFullscreen();
        } else if (videoContainerRef.current.msRequestFullscreen) {
          videoContainerRef.current.msRequestFullscreen();
        }
      }
    } else {
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
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6">
      {/* 실시간 카메라 피드 */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">수어 동작 피드백</h1>

        {/* 카메라 화면 */}
        <div 
          ref={videoContainerRef} 
          className="w-full h-[500px] bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 relative"
        >
          <CameraComponent />

          {/* ✅ 오버레이: 전체화면에서만 보이도록 설정 */}
          {isFullscreen && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black bg-opacity-80 text-white rounded-lg text-lg font-semibold">
              여기에 실시간 피드백 결과가 표시됩니다.
            </div>
          )}
        </div>

        {/* 전체화면 버튼 */}
        <div className="text-center mb-4">
          <button 
            onClick={toggleFullscreen} 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-all"
          >
            {isFullscreen ? "전체화면 종료" : "전체화면"}
          </button>
        </div>
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md text-center border border-gray-300 mx-auto">
          <p className="text-lg font-semibold text-gray-800">실시간 피드백 결과</p>
          <div className="text-xl font-bold text-black mt-2">{translatedText}</div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
