import { TutoringResponse } from "../../actions/get-tutoring";

export function MatchingInfo(props: TutoringResponse) {
  const activeLocation =
    props.online === "비대면"
      ? "비대면"
      : `대면(${props.district} ${props.dong})`;

  const extractClassTime = (timeString: string) => {
    const match = timeString.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  const classTimeInMinutes = extractClassTime(props.classTime);
  const classFee = 500 * classTimeInMinutes;

  return (
    <div className="mx-auto flex h-[247px] w-[89%] flex-col justify-center gap-[18px] rounded-[12px] bg-primaryLight px-5 py-[46px] align-middle font-pretendard">
      <div className="flex w-[287px] justify-between">
        <div className="text-labelNeutral">과목</div>
        <div className="font-semibold text-labelStrong">{props.classType}</div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-labelNeutral">학년</div>
        <div className="font-semibold text-labelStrong">{props.age}</div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-labelNeutral">수업시수</div>
        <div className="font-semibold text-labelStrong">
          {props.classCount + " " + props.classTime}
        </div>
      </div>
      <div className="flex w-[287px] justify-between">
        <div className="text-labelNeutral">수업료</div>
        <div className="font-semibold text-labelStrong">
          {classFee.toLocaleString()}원
        </div>
      </div>
      <div className="flex w-[287px] flex-wrap justify-between">
        <div className="text-labelNeutral">대면여부</div>
        <div className="font-semibold text-labelStrong">{activeLocation}</div>
      </div>
    </div>
  );
}
