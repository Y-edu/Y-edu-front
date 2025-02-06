import React from "react";

interface ProfileInfoBoxProps {
  title: React.ReactNode;
  children?: React.ReactNode;
}

function ProfileInfoBox(props: ProfileInfoBoxProps) {
  const { title, children } = props;

  return (
    <div className="flex h-auto w-full flex-col gap-5 bg-white px-5 py-[46px]">
      <div className="font-pretendard text-lg font-bold leading-[146%] tracking-[-0.02em] text-gray-800">
        {/* ↑ 웬만한 공통 스타일은 기본으로 정의해 두겠습니다! */}
        {title}
      </div>
      <div className="font-pretendard text-[15px] text-gray-900">
        {children}
      </div>
    </div>
  );
}

export default ProfileInfoBox;
