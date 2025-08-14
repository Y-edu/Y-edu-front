import Image from "next/image";

interface MonthDurationNavigatorProps {
  defaultMonth: number;
  monthDuration: {
    [key: string]: number;
  };
}

export default function MonthDurationNavigator(
  props: MonthDurationNavigatorProps,
) {
  const { defaultMonth, monthDuration } = props;

  return (
    <div className="flex h-12 w-full justify-between bg-grey-100">
      <Image
        src="/public/images/icon-arrow.svg"
        alt="left-arrow"
        width={40}
        height={40}
      />
      <Image
        src="/public/images/icon-arrow.svg"
        alt="right-arrow"
        width={40}
        height={40}
      />
    </div>
  );
}
