import React from "react";

const Source = () => {
    const sources = [
        {
            title: "소개 사진",
            description: "수화배우는 만화, 핑크 북어 지음, 돌배게 출판",
            url: "명대 신문 http://news.mju.ac.kr", // 실제 출처 URL 입력
        },
        {
            title: "Nav 배경 영상",
            description: "수화 관련 동영상",
            url: "https://www.pexels.com/ko-kr/search/videos/sign%20language/",
        },
        // 추가 출처 계속 넣기
    ];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-4xl font-bold bg-slate-500 text-white text-center p-4 rounded-md">
                출처
            </h1>
            <div className="mt-6 space-y-4">
                {sources.map((source, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded-lg shadow-md bg-white"
                    >
                        <h2 className="text-xl font-semibold text-gray-700">{source.title}</h2>
                        <p className="text-gray-600">{source.description}</p>
                        {source.url && (
                            <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline mt-2 block"
                            >
                                {source.url}
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Source;
