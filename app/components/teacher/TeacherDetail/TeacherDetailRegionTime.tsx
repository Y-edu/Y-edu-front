"use client";
import { useParams } from "next/navigation";

import BulletList from "../../../ui/List/BulletList";
import ProfileInfoBox from "../ProfileInfoBox";
import { useGetTeacherDetailsAvailable } from "../../../hooks/query/useGetTeacherDetails";
import { DayOfWeek } from "../../../actions/get-teacher-detail";

export default function TeacherDetailRegionTime() {
  const params = useParams();
  const teacherId = Array.isArray(params.id) ? params.id[0] : params.id || "";
  const { data } = useGetTeacherDetailsAvailable({ teacherId });

  /** '요일: 시간' 형태로 만드는 함수 */
  function formatAvailableTimes(availableTimes: {
    [key in DayOfWeek]: Array<string>;
  }): string[] {
    return Object.entries(availableTimes).map(([day, times]) => {
      if (times.length === 0) {
        return `${day}: 불가`;
      }

      const formattedTimes = times
        .map((time) => {
          const [hour, minute] = time.split(":");
          const hourFormatted = parseInt(hour, 10);
          const minuteFormatted =
            minute === "00" ? "" : ` ${parseInt(minute, 10)}분`;
          return `${hourFormatted}시${minuteFormatted}`;
        })
        .join(", ");

      return `${day}: ${formattedTimes}`;
    });
  }

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
