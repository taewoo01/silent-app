import React from "react";

const Nomal = () => {
  // 샘플 데이터 (수어 목록)
  const signLanguageData = [
    { id: 1, name: "안녕하세요", description: "기본적인 인사 표현", image: "hello.png" },
    { id: 2, name: "감사합니다", description: "고마움을 표현하는 수어", image: "thankyou.png" },
    { id: 3, name: "사랑해요", description: "사랑을 나타내는 표현", image: "love.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">학습된 기본 수어 목록</h1>

      {/* 수어 카드들을 옆으로 정렬하고 작은 크기로 설정 */}
      <div className="flex flex-wrap justify-center gap-4">
        {signLanguageData.map((sign) => (
          <div
            key={sign.id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-28 sm:w-32 md:w-36"
          >
            {/* 이미지 크기 조정 */}
            <img
              src={sign.image}
              alt={sign.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover mb-4"
            />
            <h2 className="text-sm sm:text-base font-semibold text-center">{sign.name}</h2>
            <p className="text-xs sm:text-sm text-gray-600 text-center mt-2">{sign.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nomal;
