import SolarFile from "../../public/images/solar_fire.png";

export const TEACHER_STYLE_TEXT = {
  kind: "따뜻하고 친절한",
  passionate: "열정적인",
  meticulous: "꼼꼼한",
  funny: "재미있는",
  selfEsteem: "자존감 지킴이",
  skillful: "수업 중심을 잡아주는 능숙한",
} as const;

export const TEACHER_STYLE_ICON = {
  kind: SolarFile,
  passionate: SolarFile,
  meticulous: SolarFile,
  funny: SolarFile,
  selfEsteem: SolarFile,
  skillful: SolarFile,
} as const;
