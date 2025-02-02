"use client";
import { useParams } from "next/navigation";
import BulletList from "../../../ui/List/BulletList";
import ProfileInfoBox from "../ProfileInfoBox";

export default function TeacherDetailRegionTime() {
  const params = useParams();
  const teacherId = params.id;

  const regions = ["강남구", "서대문구", "비대면"];
  const times = [
    "월: 13시, 15시, 17시, 18시",
    "화: 14시, 15시",
    "수: 불가",
    "목: 불가",
    "금: 16시, 18시, 19시",
    "토: 불가",
    "일: 16시, 18시, 19시",
  ];

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
        <BulletList items={regions} />
      </ProfileInfoBox>
      <ProfileInfoBox
        title={
          <p>
            선생님이 <span className="text-primaryNormal">선호하는 시간</span>
            이에요!
          </p>
        }
      >
        <BulletList items={times} />
      </ProfileInfoBox>
    </div>
  );
}
