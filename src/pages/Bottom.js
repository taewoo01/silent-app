import React from "react";
import { Link } from "react-router-dom";

const Bottom = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-6 text-center shadow-lg bottom-0 mt-20">
      <div className="text-lg font-semibold tracking-wide">
        <span className="text-blue-300">제작 시작 날짜 :</span> 2025-03-11
      </div>
      <div className="mt-2 text-sm">
        <span className="text-blue-300 font-semibold">제작자 :</span>
        <span className="ml-2 text-gray-300">김태우</span> ·
        <span className="ml-2 text-gray-300">양동호</span> ·
        <span className="ml-2 text-gray-300">이 영</span> ·
        <span className="ml-2 text-gray-300">백선주</span>
      </div>
      <Link to={'./Source'}>
        <div className="text-xs text-end">출처</div>
      </Link>
    </footer>
  );
};

export default Bottom;
