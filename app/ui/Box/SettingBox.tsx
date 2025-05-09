import Image from "next/image";

import ToggleSwitch from "@/ui/Switch/ToggleSwitch";

import Arrow from "public/images/arrow-light.png";

interface SettingBoxProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  isToggle?: boolean;
  toggleChecked?: boolean;
  onToggleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SettingBox(props: SettingBoxProps) {
  const { title, children, isToggle, toggleChecked, onToggleChange } = props;

  return (
    <div className="flex h-auto w-full flex-col gap-[8.02px] bg-white px-5 py-[46px]">
      <div className="flex items-center justify-between">
        <div className="font-pretendard text-lg font-bold leading-[146%] tracking-[-0.02em] text-labelStrong">
          {title}
        </div>
        {isToggle ? (
          <ToggleSwitch checked={toggleChecked!} onChange={onToggleChange!} />
        ) : (
          <Image
            src={Arrow}
            alt="화살표 이미지"
            className="size-5 -rotate-90"
          />
        )}
      </div>
      <div className="whitespace-pre-wrap font-pretendard text-[15px] text-labelNormal">
        {children}
      </div>
    </div>
  );
}

export default SettingBox;
