import { ImgKind } from "@/ui/Result";

import Letter from "public/images/Letter.svg";
import Document from "public/images/Document.svg";

export const RESULT_IMG_MAP = {
  letter: Letter,
  document: Document,
} satisfies Record<ImgKind, unknown>;
