import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

const SERVER_URL = "https://silent-app-server.onrender.com"; // Flask 서버 주소

const CameraComponent = ({ onPrediction }) => {
  const webcamRef = useRef(null); 
  const canvasRef = useRef(null);
  const sequenceBuffer = useRef([]);
  const socketRef = useRef(null);
  const [prediction, setPrediction] = useState({ label: "", confidence: 0 });

  // 🔍 손 특징 추출 함수
  const extractHandFeatures = (landmarks) => {
    const base = landmarks[0];
    const features = [];

    for (let i = 1; i < landmarks.length; i++) {
      const dx = landmarks[i].x - base.x;
      const dy = landmarks[i].y - base.y;
      const dz = landmarks[i].z - base.z;
      features.push(Math.sqrt(dx * dx + dy * dy + dz * dz));
    }

    const calculateAngle = (a, b, c) => {
      const ba = [a.x - b.x, a.y - b.y, a.z - b.z];
      const bc = [c.x - b.x, c.y - b.y, c.z - b.z];
      const dot = ba[0] * bc[0] + ba[1] * bc[1] + ba[2] * bc[2];
      const normBa = Math.sqrt(ba[0] ** 2 + ba[1] ** 2 + ba[2] ** 2);
      const normBc = Math.sqrt(bc[0] ** 2 + bc[1] ** 2 + bc[2] ** 2);
      const cosine = dot / (normBa * normBc + 1e-6);
      return (Math.acos(Math.min(Math.max(cosine, -1), 1)) * 180) / Math.PI;
    };

    const angles = [
      calculateAngle(landmarks[4], landmarks[3], landmarks[2]),
      calculateAngle(landmarks[8], landmarks[7], landmarks[6]),
      calculateAngle(landmarks[12], landmarks[11], landmarks[10]),
      calculateAngle(landmarks[16], landmarks[15], landmarks[14]),
      calculateAngle(landmarks[20], landmarks[19], landmarks[18]),
    ];

    features.push(...angles);
    return features;
  };

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on("connect", () => {
      console.log("Socket.IO connected");
    });

    socketRef.current.on("prediction_result", (data) => {
      if (data.error) {
        console.error("Prediction error:", data.error);
        return;
      }
      const result = { label: data.label, confidence: data.confidence };
      setPrediction(result);
    
      // ✅ 부모 컴포넌트로 전달
      if (onPrediction) {
        onPrediction(result);
      }
    });
    

    const videoElement = webcamRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    let lastProcessTime = 0;

    hands.onResults((results) => {
      const now = Date.now();
      if (now - lastProcessTime < 100) return; // 10fps
      lastProcessTime = now;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // 🖐️ 왼손/오른손 분리
        const handData = { Left: null, Right: null };

        results.multiHandLandmarks.forEach((landmarks, idx) => {
          const handedness = results.multiHandedness[idx].label; // 'Left' or 'Right'
          handData[handedness] = landmarks;
        });

        const leftFeatures = handData.Left ? extractHandFeatures(handData.Left) : Array(25).fill(0);
        const rightFeatures = handData.Right ? extractHandFeatures(handData.Right) : Array(25).fill(0);
        const combinedFeatures = [...leftFeatures, ...rightFeatures]; // 총 50개

        if (combinedFeatures.length === 50) {
          sequenceBuffer.current.push(combinedFeatures);
          if (sequenceBuffer.current.length > 30) {
            sequenceBuffer.current.shift();
          }

          if (sequenceBuffer.current.length === 30) {
            socketRef.current.emit("predict_sequence", sequenceBuffer.current);
          }
        }

        // 시각화는 첫 손만 표시
        const landmarks = results.multiHandLandmarks[0];
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 2 });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 1 });
      }

      canvasCtx.restore();
    });

    if (videoElement) {
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        facingMode: { exact: "environment" },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [webcamRef, onPrediction]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={webcamRef}
        className="absolute w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="absolute w-full h-full"
        style={{ transform: "scaleX(-1)" }}
      />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
        <p>예측: {prediction.label}</p>
      </div>
    </div>
  );
};

export default CameraComponent;