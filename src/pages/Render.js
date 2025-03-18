import React, { useState, useRef, useEffect } from "react";
import CameraComponent from "../component/Camera.js";

const Render = () => {
  const [isFullscreenCamera, setIsFullscreenCamera] = useState(false);
  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);
  const [translatedText, setTranslatedText] = useState("여기에 번역된 텍스트 표시");

  const cameraContainerRef = useRef(null);
  const videoContainerRef = useRef(null);

  // 전체화면 상태 업데이트
  const updateFullscreenStatus = () => {
    const isCameraFull = document.fullscreenElement === cameraContainerRef.current;
    const isVideoFull = document.fullscreenElement === videoContainerRef.current;
    setIsFullscreenCamera(isCameraFull);
    setIsFullscreenVideo(isVideoFull);
  };

  // 전체화면 토글 함수
  const toggleFullscreen = (containerRef, isFullscreen, setIsFullscreen) => {
    if (!isFullscreen) {
      if (containerRef.current) {
        // 전체화면으로 전환
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.mozRequestFullScreen) { // Firefox
          containerRef.current.mozRequestFullScreen();
        } else if (containerRef.current.webkitRequestFullscreen) { // Chrome, Safari
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) { // IE/Edge
          containerRef.current.msRequestFullscreen();
        }
      }
    } else {
      // 전체화면 종료
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }

    setIsFullscreen(!isFullscreen);
  };

  // fullscreenchange 이벤트 리스너
  useEffect(() => {
    document.addEventListener("fullscreenchange", updateFullscreenStatus);
    document.addEventListener("webkitfullscreenchange", updateFullscreenStatus);
    document.addEventListener("mozfullscreenchange", updateFullscreenStatus);
    document.addEventListener("MSFullscreenChange", updateFullscreenStatus);

    // 컴포넌트 unmount 시 리스너 정리
    return () => {
      document.removeEventListener("fullscreenchange", updateFullscreenStatus);
      document.removeEventListener("webkitfullscreenchange", updateFullscreenStatus);
      document.removeEventListener("mozfullscreenchange", updateFullscreenStatus);
      document.removeEventListener("MSFullscreenChange", updateFullscreenStatus);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8 p-6">
      {/* 실시간 수어 번역 */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          실시간 수어 번역
        </h1>
        {/* 카메라 화면 */}
        <div
          ref={cameraContainerRef}
          className="w-full h-full bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 mx-auto relative"
        >
          <CameraComponent />
        </div>

        {/* 전체화면 버튼 */}
        <div className="text-center mb-4">
          <button
            onClick={() => toggleFullscreen(cameraContainerRef, isFullscreenCamera, setIsFullscreenCamera)}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg text-sm hover:bg-blue-600 transition-all"
          >
            {isFullscreenCamera ? "전체화면 종료" : "전체화면"}
          </button>
        </div>

        {/* 번역 결과 (전체화면 모드에서도 표시됨) */}
        <div
          className={`w-full max-w-2xl p-6 bg-white rounded-lg shadow-md text-center border border-gray-300 mx-auto ${isFullscreenCamera ? 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white z-10' : ''}`}
        >
          <p className="text-lg font-semibold text-gray-800">번역 결과</p>
          <div className="text-xl font-bold text-black mt-2">
            {translatedText}
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-l-2 h-full border-gray-300"></div>

      {/* 영상 부분 - 틀 추가 */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          영상 번역
        </h1>

        {/* 영상 화면 틀 */}
        <div
          ref={videoContainerRef}
          className="w-full max-w-2xl h-96 bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 mx-auto relative border-4 border-gray-500"
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

        {/* 번역 결과 (영상 화면에서도 전체화면 모드에서 표시됨) */}
        <div
          className={`w-full max-w-2xl p-6 bg-white rounded-lg shadow-md text-center border border-gray-300 mx-auto ${isFullscreenVideo ? 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white z-10' : ''}`}
        >
          <p className="text-lg font-semibold text-gray-800">번역 결과</p>
          <div className="text-xl font-bold text-black mt-2">
            {translatedText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Render;
