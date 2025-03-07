import Image from "next/image";
import Arrow from "public/images/arrow-light.png";

interface SettingBoxProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  isToggle?: boolean;
}

function SettingBox(props: SettingBoxProps) {
  const { title, children, isToggle } = props;

  return (
    <div className="flex h-auto w-full flex-col gap-[8.02px] bg-white px-5 py-[46px]">
      <div className="flex items-center justify-between">
        <div className="font-pretendard text-lg font-bold leading-[146%] tracking-[-0.02em] text-labelStrong">
          {title}
        </div>
        {isToggle ? (
          <label
            className="relative inline-block h-6 w-10"
            aria-label="토글 스위치"
          >
            <input type="checkbox" className="peer size-0 opacity-0" />
            <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-blue-500" />
            <span className="absolute left-1 top-1 size-4 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-4" />
          </label>
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
