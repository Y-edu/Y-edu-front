import Image, { StaticImageData } from "next/image";

interface IconTitleChipProps {
  title: string;
  icon: StaticImageData | string;
}

function IconTitleChip(props: IconTitleChipProps) {
  const { title, icon } = props;
  return (
    <div className="flex w-fit gap-[6px] rounded-lg bg-[#EEF4FF] px-3 py-[10px]">
      <Image
        className="size-5"
        src={icon}
        alt="아이콘 이미지"
        width={20}
        height={20}
      />
      <p className="font-pretendard font-bold leading-[146%] tracking-[-0.02em]">
        {title}
      </p>
    </div>
  );
}

export default IconTitleChip;
