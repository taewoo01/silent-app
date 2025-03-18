import React, { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive"; // 반응형 처리를 위한 훅
import CameraComponent from "../component/Camera.js";

const Render = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 }); // 태블릿 이하 (1024px 이하)에서만 true
  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);
  const [translatedText, setTranslatedText] = useState("여기에 번역된 텍스트 표시");
  const [isBackCamera, setIsBackCamera] = useState(true); // 후면 카메라 기본 설정

  const videoContainerRef = useRef(null);

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
      // 전체화면 종료 전에 문서가 전체화면 상태인지 확인
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
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 mx-auto relative">
            <CameraComponent cameraFacing={isBackCamera ? "environment" : "user"} />
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
