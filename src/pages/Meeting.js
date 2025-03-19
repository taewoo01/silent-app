import React, { useEffect, useRef } from "react";

const Meeting = () => {
  const jitsiContainerRef = useRef(null);
  const jitsi = useRef(null); // 상태 업데이트 없이 Jitsi 인스턴스 관리

  useEffect(() => {
    // 중복 생성 방지: 이미 Jitsi 인스턴스가 존재하면 실행하지 않음
    if (jitsi.current) return;

    const loadJitsiScript = () => {
      if (document.getElementById("jitsi-api")) {
        initializeJitsi(); // 스크립트가 이미 로드된 경우, 바로 초기화 실행
        return;
      }

      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.id = "jitsi-api";
      script.onload = initializeJitsi; // 스크립트 로드 후 초기화
      script.onerror = () => console.error("Jitsi API 로드 오류");
      document.head.appendChild(script);
    };

    loadJitsiScript();

    return () => {
      if (jitsi.current) {
        jitsi.current.dispose(); // 컴포넌트 언마운트 시 정리
        jitsi.current = null;
      }
    };
  }, []);

  // Jitsi 초기화 함수
  const initializeJitsi = () => {
    if (!window.JitsiMeetExternalAPI || jitsi.current) return; // 중복 실행 방지

    const domain = "meet.jit.si";
    const options = {
      roomName: "MyCustomMeetingRoom",
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: "600px",
      userInfo: { displayName: "사용자" },
    };

    jitsi.current = new window.JitsiMeetExternalAPI(domain, options);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">화상 회의</h1>
      <div
        ref={jitsiContainerRef}
        className="w-full max-w-4xl h-[600px] border border-gray-300 shadow-md rounded-lg"
      ></div>
    </div>
  );
};

export default Meeting;
