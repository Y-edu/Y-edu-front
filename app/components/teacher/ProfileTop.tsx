"use client";
import { useParams } from "next/navigation";

import ProfileImageName from "./ProfileImageName";

import { useGetTeacherDetailsInfo } from "app/hooks/query/useGetTeacherDetails";

export default function ProfileTop() {
  const params = useParams();
  const teacherId = Array.isArray(params.id) ? params.id[0] : params.id || "";
  const { data, error } = useGetTeacherDetailsInfo({ teacherId });

  if (error) throw error;

  return (
    <div className="flex w-full justify-center py-[42px]">
      {data && (
        <ProfileImageName
          imgSrc={data.data.profile}
          name={`${data.data.nickName} 선생님`}
        />
      )}
    </div>
  );
}
