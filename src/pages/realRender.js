import React, { useState, useRef, useEffect } from "react";
import CameraComponent from "../component/Camera";

const RealRender = () => {
  const [isFullscreenCamera, setIsFullscreenCamera] = useState(false);
  const [translatedText, setTranslatedText] = useState("여기에 번역된 텍스트 표시");
  const [isBackCamera, setIsBackCamera] = useState(true);
  const cameraContainerRef = useRef(null);

  // 전체화면 변경 감지 이벤트
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreenCamera(!!document.fullscreenElement);
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
    if (!isFullscreenCamera) {
      if (cameraContainerRef.current) {
        if (cameraContainerRef.current.requestFullscreen) {
          cameraContainerRef.current.requestFullscreen();
        } else if (cameraContainerRef.current.mozRequestFullScreen) {
          cameraContainerRef.current.mozRequestFullScreen();
        } else if (cameraContainerRef.current.webkitRequestFullscreen) {
          cameraContainerRef.current.webkitRequestFullscreen();
        } else if (cameraContainerRef.current.msRequestFullscreen) {
          cameraContainerRef.current.msRequestFullscreen();
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
    setIsFullscreenCamera(!isFullscreenCamera);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        실시간 수어 번역
      </h1>

      {/* 카메라 화면 */}
      <div
        ref={cameraContainerRef}
        className="w-full h-64 bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 mx-auto relative"
      >
        <CameraComponent cameraFacing={isBackCamera ? "environment" : "user"} />

        {isFullscreenCamera && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black bg-opacity-80 text-white rounded-lg text-lg font-semibold">
            여기에 실시간 번역이 표시됩니다.
          </div>
        )}
      </div>

      {/* 카메라 화면 전체화면 버튼 */}
      <div className="text-center mb-4">
        <button
          onClick={toggleFullscreen}
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
  );
};

export default RealRender;