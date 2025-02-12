"use client";
import { useParams } from "next/navigation";

import BulletList from "../../../ui/List/BulletList";
import ProfileInfoBox from "../ProfileInfoBox";
import { useGetTeacherDetailsAvailable } from "../../../hooks/query/useGetTeacherDetails";
import { formatAvailableTimes } from "../../../utils/formatAvailableTimes";

export default function TeacherDetailRegionTime() {
  const params = useParams();
  const teacherId = Array.isArray(params.id) ? params.id[0] : params.id || "";
  const { data, error } = useGetTeacherDetailsAvailable({ teacherId });

  if (error) throw error;

  return (
    <div className="flex flex-col gap-[10px] bg-primaryPale">
      {data && (
        <>
          <ProfileInfoBox
            title={
              <p>
                이 <span className="text-primaryNormal">지역</span>에서 과외가
                가능해요.
              </p>
            }
          >
            <BulletList items={data.data.districts} />
          </ProfileInfoBox>
          <ProfileInfoBox
            title={
              <p>
                선생님이{" "}
                <span className="text-primaryNormal">선호하는 시간</span>
                이에요!
              </p>
            }
          >
            <BulletList items={formatAvailableTimes(data.data.availables)} />
          </ProfileInfoBox>
        </>
      )}
    </div>
  );
}
