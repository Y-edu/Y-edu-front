import Image from "next/image";

import { RESULT_IMG_MAP } from "@/constants/result/resultImg";

export type ImgKind = "letter";

function ResultImage({ kind }: { kind: ImgKind }) {
  return (
    <Image
      src={RESULT_IMG_MAP[kind]}
      alt="완료 이미지"
      width={80}
      height={80}
    />
  );
}

function ResultTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="mt-6 text-2xl font-bold text-gray-900">{children}</h1>;
}

function ResultDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 whitespace-pre font-medium text-gray-400">{children}</p>
  );
}

function ResultMain({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {children}
    </div>
  );
}

export const Result = Object.assign(ResultMain, {
  Image: ResultImage,
  Title: ResultTitle,
  Description: ResultDescription,
});
