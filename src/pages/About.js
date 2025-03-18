//소개 페이지
import React from "react";

const About = () => {
    return (
        <>
            <div className="text-3xl font-bold text-blue-500 justify-center grid">
                <div>실시간 카메라 촬영 및 저장된 영상 분석을 통해 수어를 인식하고 해석하는 기능을 제공하는 앱 서비스</div>

                <div className="mt-7">AI 기반의 딥러닝 모델을 활용하여 손의 움직임과 형태를 분석하고 번역 결과를 문자 및 음성으로 출력</div>

                <div className="mt-7">수어를 해석할 뿐만 아니라 수어를 학습할 수 있도록관련 정보를 저장하여 제공</div>

                <div className="mt-7">사용자가 수어를 연습 가능한 실시간 피드백 시스템</div>
            </div>
        </>
    )
}

export default About;