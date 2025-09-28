"use client";

interface ClassSummaryCardProps {
  data: {
    progressRound: string;
    teacherClassMinute: string;
    paidAt: string;
    parentPay: string;
    teacherPay: string;
    fourWeekFee: string;
    changeTeacherRecord: string;
  };
}

export default function ClassSummaryCard({ data }: ClassSummaryCardProps) {
  return (
    <div className="grid grid-cols-7 gap-4 rounded-xl border bg-white p-4 shadow">
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">진행 회차</p>
        <p className="text-sm">{data.progressRound}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">
          선생님 진행 분
        </p>
        <p className="text-sm">{data.teacherClassMinute}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">최근 결제일시</p>
        <p className="text-sm">{data.paidAt}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">결제할 수업료</p>
        <p className="text-sm">{data.parentPay}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">지급할 보수</p>
        <p className="text-sm">{data.teacherPay}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">
          4주 기준 수업료
        </p>
        <p className="text-sm">{data.fourWeekFee}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">
          선생님 교체 기록
        </p>
        <p className="text-sm">{data.changeTeacherRecord}</p>
      </div>
    </div>
  );
}
