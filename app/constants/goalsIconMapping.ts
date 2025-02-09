import { StaticImageData } from "next/image";

import Note from "../../public/images/Note.png";
import Speak from "../../public/images/Speak.png";
import Listen from "../../public/images/Listen.png";
import Write from "../../public/images/Write.png";
import Read from "../../public/images/Read.png";
import Assist from "../../public/images/Assist.png";
import Talk from "../../public/images/Talk.png";
import Layers from "../../public/images/Layers.png";

export const GOALS_STYLE_ICON: Record<string, StaticImageData | string> = {
  라이팅: Write,
  리딩: Read,
  스피킹: Speak,
  리스닝: Listen,
  "국제학교 입학": Assist,
  "학교 숙제 보완": Layers,
  기타: Talk,
  "수학과 친해지기": Note,
  "수학 기초 개념 정리": Read,
  "개념 응용 수업": Write,
  "수학 학원 보조": Layers,
  "영재/과학고 미리 준비": Assist,
  "초등 회화": Talk,
};

export const GOALS_CONTRACT: Record<string, string> = {
  "국제학교 입학": "국제대 입학",
  "영재/과학고 미리 준비": "과학고 준비",
  라이팅: "라이팅",
  리딩: "리딩",
  스피킹: "스피킹",
  리스닝: "리스닝",
  "학교 숙제 보완": "학교숙제 보조",
  회화: "회화",
  "수학과 친해지기": "수학과 친해지기",
  "수학 기초 개념 정리": "수학 개념 마스터",
  "개념 응용 수업": "심화응용",
  "수학 학원 보조": "학원보조",
  기타: "기타",
};
