import { ImgKind } from "@/ui/Result";

import Letter from "../../../public/images/Letter.svg";

export const RESULT_IMG_MAP = {
  letter: Letter,
} satisfies Record<ImgKind, unknown>;
