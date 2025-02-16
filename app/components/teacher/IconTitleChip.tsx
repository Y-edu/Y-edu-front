import Image, { StaticImageData } from "next/image";

interface IconTitleChipProps {
  title: string;
  icon: StaticImageData | string;
}

function IconTitleChip(props: IconTitleChipProps) {
  const { title, icon } = props;
  return (
    <div className="flex w-fit items-center gap-[6px] rounded-lg bg-primaryTint px-3 py-2">
      <Image
        className="h-[18px] w-[18px]"
        src={icon}
        alt="아이콘 이미지"
        width={18}
        height={18}
      />
      <p className="font-pretendard font-bold leading-[146%] tracking-[-0.02em] text-labelStrong">
        {title}
      </p>
    </div>
  );
}

export default IconTitleChip;
