import { useEffect } from "react";

export default function useUnsavedChangeWarning(hasChanges: boolean) {
  useEffect(() => {
    // iOS 기기 감지: iPad, iPhone, iPod 또는 터치가 가능한 Mac 환경
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    if (isIOS) {
      // iOS에서는 해당 로직을 실행하지 않음
      return;
    }

    if (hasChanges) {
      window.history.pushState(null, "", window.location.href);
    }

    const handlePopState = () => {
      if (hasChanges) {
        const confirmLeave = confirm(
          "저장하지 않은 변경사항이 있습니다. 페이지를 떠나시겠습니까?",
        );
        if (confirmLeave) {
          window.history.go(-1);
        } else {
          window.history.pushState(null, "", window.location.href);
        }
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasChanges) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);
}
