"use client";

import BulletList from "@/ui/List/BulletList";
import { formatAvailableTimes } from "@/utils/formatAvailableTimes";
import { DayOfWeek } from "@/actions/get-teacher-detail";

import ProfileInfoBox from "app/components/teacher/ProfileInfoBox";

interface TeacherDetailRegionTimeProps {
  districts: Array<string>;
  available: {
    [key in DayOfWeek]: Array<string>;
  };
}

export default function TeacherDetailRegionTime(
  props: TeacherDetailRegionTimeProps,
) {
  const { districts, available } = props;

  return (
    <div className="flex flex-col gap-[10px] bg-primaryPale">
      <ProfileInfoBox
        title={
          <p>
            이 <span className="text-primaryNormal">지역</span>에서 과외가
            가능해요.
          </p>
        }
      >
        <BulletList items={districts} />
      </ProfileInfoBox>
      {available &&
        !Object.values(available).every(
          (times) => times.length === 1 && times[0] === "불가",
        ) && (
          <ProfileInfoBox
            title={
              <div className="flex flex-col gap-1">
                <p>
                  선생님이{" "}
                  <span className="text-primaryNormal">선호하는 시간</span>
                  이에요!
                </p>
                <p className="text-[15px] font-medium leading-[152%] text-labelAssistive">
                  선생님과 협의하여 시간을 조율할 수 있어요.
                </p>
              </div>
            }
          >
            <BulletList items={formatAvailableTimes(available)} />
          </ProfileInfoBox>
        )}
    </div>
  );
}
