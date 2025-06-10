import React from "react";

const Nomal = () => {
  // 샘플 데이터 (수어 목록)
  const signLanguageData = [
    { id: 1, name: "1", description: "숫자 1", image: "/images/1.png" },
    { id: 2, name: "2", description: "숫자 2", image: "/images/2.png" },
    { id: 3, name: "3", description: "숫자 3", image: "/images/3.png" },
    { id: 4, name: "괜찮아요", description: "괜찮다는 표현", image: "/images/괜찮아요.png" },
    { id: 5, name: "덥다", description: "덥다는 표현", image: "/images/덥다.png" },
    { id: 6, name: "사랑합니다", description: "사랑한다는 표현", image: "/images/사랑합니다.png" },
    { id: 7, name: "수어", description: "수어라는 단어", image: "/images/수어.png" },
    { id: 8, name: "ㅇ", description: "자음 ㅇ", image: "/images/ㅇ.png" },
    { id: 9, name: "잘지냈어요", description: "잘 지냈다는 표현", image: "/images/잘 지냈어요.png" },
    { id: 10, name: "ㅑ", description: "모음 ㅑ", image: "/images/ㅑ.png" },
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
