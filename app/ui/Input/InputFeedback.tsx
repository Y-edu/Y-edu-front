import IconSuccess from "@/icons/IconSuccess";
import IconWarning from "@/icons/IconWarning";

const FeedbackIconMap = {
  success: <IconSuccess />,
  warning: <IconWarning />,
} as const;

export type InputFeedbackType = keyof typeof FeedbackIconMap;

interface InputFeedbackProps {
  type: InputFeedbackType;
  message: string;
  className?: string;
}

export default function InputFeedback({
  type,
  message,
  className = "",
}: InputFeedbackProps) {
  const icon = FeedbackIconMap[type];
  const colorClass = type === "warning" ? "text-warning" : "text-green-600";

  return (
    <div
      className={`mt-2 flex items-center gap-1 text-sm ${colorClass} ${className}`}
    >
      {icon}
      {message}
    </div>
  );
}
