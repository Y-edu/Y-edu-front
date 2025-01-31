import { TutoringResponse } from "../../actions/get-tutoring";

export function MatchingInfo(
  props: Pick<
    TutoringResponse["data"],
    | "online"
    | "classTime"
    | "classCount"
    | "subject"
    | "dong"
    | "district"
    | "age"
    | "detail"
  >,
) {
  // Todo- 수업료 계산 로직 필요
  const activeLocation = props.online
    ? "비대면"
    : props.district + "\n" + props.dong + "\n" + props.detail;

  const actievClassHours = `주 ${props.classCount}회 ${props.classCount * props.classTime}분`;
  return (
    <div className="flex min-h-[250px] min-w-[335px] flex-col gap-[42px] rounded-[12px] bg-[#F5F5F5] px-[30px] py-[24px]">
      <div className="flex w-[287px] justify-between">
        <div className="text-[#616161]">과목</div>
        <div className="font-semibold text-[#171719]">{props.subject}</div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-[#616161]">학년</div>
        <div className="font-semibold text-[#171719]">{props.age}</div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-[#616161]">수업시수</div>
        <div className="font-semibold text-[#171719]">{actievClassHours}</div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-[#616161]">수업료</div>
        <div className="font-semibold text-[#171719]">
          {6000 * props.classTime * props.classCount}
        </div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-[#616161]">대면여부</div>
        <div className="w-[200px] whitespace-normal break-words font-semibold text-[#171719]">
          {activeLocation}
        </div>
      </div>
    </div>
  );
}
