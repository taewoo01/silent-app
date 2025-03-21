import React, { useRef } from "react";
import Webcam from "react-webcam";

const CameraComponent = ({ cameraFacing = "environment" }) => {
  const webcamRef = useRef(null);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Webcam
        ref={webcamRef}
        className="w-full h-full rounded-lg"
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: { exact: cameraFacing }, // ✅ cameraFacing 값을 직접 반영
        }}
      />
    </div>
  );
};

export default CameraComponent;
