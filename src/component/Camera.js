// components/Camera.js
import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const CameraComponent = () => {
  const webcamRef = useRef(null);

  useEffect(() => {
    console.log("useEffect is called"); // 이 로그가 출력되는지 확인
    // getUserMedia()로 카메라 권한 요청
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("Camera is enabled", stream);
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  }, []);

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia is supported");
  } else {
    console.error("getUserMedia is not supported in this browser");
  }
  

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Webcam
        ref={webcamRef}
        className="w-full h-full rounded-lg"
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "user", // 전면 카메라 (후면: "environment")
        }}
      />
    </div>
  );
};

export default CameraComponent;
