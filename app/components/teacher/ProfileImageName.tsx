import Image, { StaticImageData } from "next/image";

interface ProfileImageNameProps {
  imgSrc: StaticImageData | string | null;
  name: string;
}

export default function ProfileImageName(props: ProfileImageNameProps) {
  const { imgSrc, name } = props;

  return (
    <div className="flex w-auto flex-col items-center gap-4 text-center">
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt="프로필 이미지"
          width={110}
          height={110}
          className="h-auto w-[110px] rounded-xl"
        />
      ) : (
        <div className="h-[180px] w-[110px] rounded-xl bg-gray-200" />
      )}
      <p className="font-pretendard text-xl font-bold text-labelStrong">
        {name}
      </p>
    </div>
  );
}
