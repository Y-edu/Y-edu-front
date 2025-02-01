import Image, { StaticImageData } from "next/image";

interface ProfileImageNameProps {
  imgSrc: StaticImageData | string;
  name: string;
}

export default function ProfileImageName(props: ProfileImageNameProps) {
  const { imgSrc, name } = props;

  return (
    <div className="flex w-[121px] flex-col items-center gap-4">
      <Image
        src={imgSrc}
        alt="프로필 이미지"
        width={110}
        height={110}
        className="h-auto w-[110px]"
      />
      <p className="font-pretendard text-xl font-bold text-labelStrong">
        {name}
      </p>
    </div>
  );
}
