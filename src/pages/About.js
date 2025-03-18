import React from "react";

const About = () => {
    return (
        <div className="bg-gray-50 py-12 px-6 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
                {/* 왼쪽 텍스트 부분 */}
                <div>
                    <h1 className="text-4xl font-extrabold text-blue-600 mb-4">실시간 수어 동작 인식 앱 서비스</h1>
                    <p className="text-xl text-gray-700 mb-6">실시간 카메라 촬영 및 저장된 영상 분석을 통해 수어를 인식하고 해석하는 기능을 제공하는 앱 서비스입니다.</p>
                    <p className="text-xl text-gray-700 mb-6">AI 기반의 딥러닝 모델을 활용하여 손의 움직임과 형태를 분석하고, 번역 결과를 문자 및 음성으로 출력합니다.</p>
                    <p className="text-xl text-gray-700 mb-6">수어를 해석할 뿐만 아니라, 수어를 학습할 수 있도록 관련 정보를 저장하여 제공합니다.</p>
                    <p className="text-xl text-gray-700">사용자가 수어를 연습 가능한 실시간 피드백 시스템도 제공하여, 효과적인 학습을 돕습니다.</p>
                </div>
                
                {/* 오른쪽 이미지 부분 */}
                <div className="flex justify-center items-center">
                    <div className="w-full h-auto bg-gray-300 rounded-lg shadow-lg">
                        <img 
                            src="/images/d.jpg" 
                            alt="Sign language recognition app" 
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
