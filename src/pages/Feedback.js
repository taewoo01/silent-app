import React, { useRef, useState } from "react";
import CameraComponent from "../component/Camera.js";

const Feedback = () => {
  const videoContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 전체화면 토글 함수
  const toggleFullscreen = () => {
    if (!isFullscreen) {
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
      // 전체화면 종료 전에 문서가 활성화되어 있는지 확인
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
    <div className="flex flex-col items-center justify-center p-6 space-y-6">
      
      {/* 실시간 카메라 피드 및 피드백 */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">수어 동작 피드백</h1>

        {/* 카메라 화면 (텍스트 오버레이 추가) */}
        <div 
          ref={videoContainerRef} 
          className="w-full h-[500px] bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 relative"
        >
          <CameraComponent />
          
          {/* 🔥 실시간 피드백 텍스트 (오버레이) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black bg-opacity-50 text-white rounded-lg text-lg font-semibold">
            여기에 실시간 피드백 결과가 표시됩니다.
          </div>
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
      </div>

    </div>
  );
};

export default Feedback;
