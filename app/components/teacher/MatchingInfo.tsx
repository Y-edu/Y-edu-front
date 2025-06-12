import { TutoringResponse } from "app/actions/get-tutoring";

export function MatchingInfo(
  props: Omit<TutoringResponse, "parentDayTimes" | "teacherDayTimes">,
) {
  const activeLocation =
    props.online === "비대면"
      ? "비대면"
      : `대면(${props.district} ${props.dong})`;

  return (
    <div className="mx-auto flex h-auto w-11/12 flex-col justify-center gap-[18px] rounded-[12px] bg-primaryLight px-6 py-[30px] align-middle">
      <div className="flex justify-between">
        <div className="text-[#616161]">과목</div>
        <div className="font-semibold text-[#171719]">{props.classType}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-[#616161]">학년</div>
        <div className="font-semibold text-[#171719]">{props.age}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-[#616161]">수업시수</div>
        <div className="font-semibold text-[#171719]">
          {props.classCount + " " + props.classTime}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-[#616161]">수업료</div>
        <div className="font-semibold text-[#171719]">
          4주 기준 {props?.pay?.toLocaleString()}원
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="text-[#616161]">대면여부</div>
        <div className="font-semibold text-[#171719]">{activeLocation}</div>
      </div>
    </div>
  );
}
