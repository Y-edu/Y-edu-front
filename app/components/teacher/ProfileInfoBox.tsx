import React from "react";

interface ProfileInfoBoxProps {
  title: string;
  content: React.ReactNode;
}

function ProfileInfoBox(props: ProfileInfoBoxProps) {
  const { title, content } = props;

  return (
    <div className="flex h-auto w-full flex-col gap-5 px-5 py-[46px]">
      <p className="font-pretendard text-lg font-bold leading-[146%] tracking-[-0.02em] text-gray-800">
        {title}
      </p>
      <div className="font-pretendard text-[15px] text-gray-900">{content}</div>
    </div>
  );
}

export default ProfileInfoBox;
