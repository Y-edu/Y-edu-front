"use client";

import ProfileImageName from "./ProfileImageName";

interface ProfileTopProps {
  profile: string;
  nickName: string;
}

export default function ProfileTop(props: ProfileTopProps) {
  const { profile, nickName } = props;

  return (
    <div className="flex w-full justify-center py-[42px]">
      <ProfileImageName imgSrc={profile} name={`${nickName} 선생님`} />
    </div>
  );
}
