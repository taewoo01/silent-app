import React from "react";

const Nomal = () => {
  // 샘플 데이터 (수어 목록)
  const signLanguageData = [
    { id: 1, name: "안녕하세요", description: "기본적인 인사 표현", image: "hello.png" },
    { id: 2, name: "감사합니다", description: "고마움을 표현하는 수어", image: "thankyou.png" },
    { id: 3, name: "미안합니다", description: "사과의 표현", image: "love.png" },
    { id: 4, name: "사랑합니다", description: "사랑을 나타내는 표현", image: "love.png" },
    { id: 5, name: "네", description: "긍정의 대답", image: "love.png" },
    { id: 6, name: "아니요", description: "부정의 대답", image: "love.png" },
    { id: 7, name: "잘 지내세요?", description: "안부의 표현", image: "love.png" },
    { id: 8, name: "다시 말해주세요", description: "다시 물음의 표현", image: "love.png" },
    { id: 9, name: "기다려주세요", description: "잠시 기다려달라는 요청의 표현", image: "love.png" },
    { id: 10, name: "모르겠어요", description: "이해를 못 했을 때의 표현", image: "love.png" },
    { id: 11, name: "이해했어요", description: "이해 했을 때의 표현", image: "love.png" },
    { id: 12, name: "무슨 일이에요", description: "무슨 일이 있는 지 질문", image: "love.png" },
    { id: 13, name: "좋은 밤 되세요", description: "밤인사", image: "love.png" },
    { id: 14, name: "좋은 아침이에요", description: "아침 인사", image: "love.png" },
    { id: 15, name: "만나서 반가워요", description: "만남을 환영할 때의 표현", image: "love.png" },
    { id: 16, name: "괜찮아요", description: "문제가 없을 때 하는 표현", image: "love.png" },
    { id: 17, name: "좋아요", description: "긍정의 표현", image: "love.png" },
    { id: 18, name: "싫어요", description: "부정의 표현", image: "love.png" },
    { id: 19, name: "축하합니다", description: "축하의 표현", image: "love.png" },
    { id: 20, name: "도와주세요", description: "도움의 표현", image: "love.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">학습된 기본 수어 목록</h1>
      
      {/* 수어 카드 리스트 */}
      <div className="flex flex-wrap justify-center gap-4">
        {signLanguageData.map((sign) => (
          <div
            key={sign.id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-28 sm:w-32 md:w-36 lg:w-72"
          >
            {/* 이미지 크기 조정 */}
            <img
              src={sign.image}
              alt={sign.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-44 lg:h-32 object-cover mb-4"
            />
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-center">{sign.name}</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center mt-2">{sign.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nomal;
