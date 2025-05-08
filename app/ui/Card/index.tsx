"use client";

import Button from "@/ui/Button";
import { defaultActions } from "@/ui/Card/defaultActions";

export interface ActionButton {
  label: string;
  variant?: "primary" | "secondary";
  handleOnClick?: () => void;
}

export type ClassStatus = "scheduled" | "ongoing" | "completed";

export interface ClassScheduleCardProps {
  date: string;
  time: string;
  status: ClassStatus;
  actions?: ActionButton[];
  className?: string;
}

const ClassScheduleCard: React.FC<ClassScheduleCardProps> = ({
  date,
  time,
  status,
  actions,
  className = "",
}) => {
  const btns: ActionButton[] = actions ?? defaultActions[status];

  const primary = btns.filter((a) => a.variant === "primary");
  const secondary = btns.filter((a) => a.variant !== "primary");

  const buttonClass =
    status === "completed"
      ? "bg-white text-gray-600 border border-gray-300"
      : "bg-primary";

  return (
    <div className={`rounded-xl bg-white p-4 shadow ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[16px] font-bold text-gray-900">
          {date} {time}
        </div>
        <div className="text-[16px] font-semibold text-primary">
          {status === "scheduled"
            ? "예정"
            : status === "ongoing"
              ? "진행중"
              : "완료"}
        </div>
      </div>

      <div className="space-y-2">
        {primary.map((btn, i) => (
          <Button
            key={i}
            onClick={btn.handleOnClick}
            className={`h-11 text-white ${buttonClass}`}
          >
            {btn.label}
          </Button>
        ))}

        {secondary.length > 0 && (
          <div className="flex space-x-2">
            {secondary.map((btn, i) => (
              <Button
                key={i}
                onClick={btn.handleOnClick}
                className="h-11 bg-primaryTint text-primary"
              >
                {btn.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassScheduleCard;
