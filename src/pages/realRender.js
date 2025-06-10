import React, { useRef, useState } from "react";
import CameraComponent from "../component/Camera";

const RealRender = () => {
  const cameraContainerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 전체화면 토글
  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      await cameraContainerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        실시간 수어 번역
      </h1>

      <div
        ref={cameraContainerRef}
        className="w-full max-w-3xl h-[400px] bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 relative"
      >
        <CameraComponent />

        <button
          onClick={toggleFullScreen}
          className="absolute top-2 right-2 bg-white text-black border px-3 py-1 rounded-md text-sm hover:bg-gray-200"
        >
          {isFullScreen ? "전체화면 종료" : "전체화면"}
        </button>
      </div>
    </div>
  );
};

export default RealRender;
