import React, { useState, useRef, useEffect } from "react";

const Render = () => {
  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);
  const [translatedText, setTranslatedText] = useState("여기에 번역된 텍스트 표시");
  const [videoFile, setVideoFile] = useState(null); // 업로드된 영상 파일 상태 관리
  const [videoUrl, setVideoUrl] = useState(""); // 영상 URL 상태 관리

  const videoContainerRef = useRef(null);

  // 전체화면 변경 감지 이벤트
  useEffect(() => {
    const handleFullscreenChange = () => {
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

  // 영상 업로드 처리 함수
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file)); // 영상을 브라우저에서 볼 수 있도록 URL 생성
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      {/* 영상 번역 부분 (모든 화면에서 표시됨) */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">영상 번역</h1>

        {/* 영상 화면 */}
        <div
          ref={videoContainerRef}
          className="w-full max-w-2xl h-96 bg-gray-800 flex items-center justify-center rounded-lg shadow-md mb-4 mx-auto border-4 border-gray-500 relative"
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {videoUrl ? (
            <video width="100%" height="100%" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <span className="text-white text-lg">화면 클릭시 파일 추가</span>
          )}
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
