"use client";

interface ClassSummaryCardProps {
  data: {
    진행회차: string;
    선생님진행분: string;
    최근결제일시: string;
    수업료: string;
    선생님보수: string;
    선생님교체기록: string;
  };
}

export default function ClassSummaryCard({ data }: ClassSummaryCardProps) {
  return (
    <div className="grid grid-cols-6 gap-4 rounded-xl border bg-white p-4 shadow">
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">진행 회차</p>
        <p className="text-sm">{data.진행회차}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">
          선생님 진행 분
        </p>
        <p className="text-sm">{data.선생님진행분}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">최근 결제일시</p>
        <p className="text-sm">{data.최근결제일시}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">수업료</p>
        <p className="text-sm">{data.수업료}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">선생님 보수</p>
        <p className="text-sm">{data.선생님보수}</p>
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-primary">
          선생님 교체 기록
        </p>
        <p className="text-sm">{data.선생님교체기록}</p>
      </div>
    </div>
  );
}
