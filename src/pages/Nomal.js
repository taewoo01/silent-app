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
            <h1 className="text-4xl font-bold text-center">
                학습된 기본 수어 목록
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {signLanguageData.map((sign) => (
                    <div key={sign.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                        <img src={sign.image} alt={sign.name} className="w-32 h-32 object-cover mb-4" />
                        <h2 className="text-xl font-semibold">{sign.name}</h2>
                        <p className="text-gray-600 text-center mt-2">{sign.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Nomal;
