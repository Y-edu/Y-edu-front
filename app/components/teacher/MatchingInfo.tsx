import { TutoringResponse } from "../../actions/get-tutoring";

export function MatchingInfo(props: TutoringResponse) {
  const activeLocation = props.online
    ? "비대면"
    : String(props.district + "\n" + props.dong);

  const extractClassTime = (timeString: string) => {
    const match = timeString.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  const classTimeInMinutes = extractClassTime(props.classTime);
  const classFee = 500 * classTimeInMinutes;

  return (
    <div className="ml-[16px] flex min-h-[250px] min-w-[335px] flex-col justify-center gap-[42px] rounded-[12px] bg-primaryLight px-5 py-[46px] align-middle">
      <div className="flex w-[287px] justify-between">
        <div className="text-[#616161]">과목</div>
        <div className="font-semibold text-[#171719]">{props.classType}</div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-[#616161]">학년</div>
        <div className="font-semibold text-[#171719]">{props.age}</div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-[#616161]">수업시수</div>
        <div className="font-semibold text-[#171719]">{props.classCount}</div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-[#616161]">수업료</div>
        <div className="font-semibold text-[#171719]">
          {classFee.toLocaleString()}원
        </div>
      </div>
      <div className="flex w-[287px] flex-wrap justify-between">
        <div className="text-[#616161]">대면여부</div>
        <div className="font-semibold text-[#171719]">{activeLocation}</div>
      </div>
    </div>
  );
}
