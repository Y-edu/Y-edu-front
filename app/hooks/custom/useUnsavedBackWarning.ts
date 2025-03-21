import { useEffect, useState } from "react";

type ModalTrigger = "popstate" | "button" | null;

export default function useUnsavedBackWarning(
  hasChanges: boolean,
  onPopstateConfirm: () => void,
  onButtonConfirm: () => void,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerType, setTriggerType] = useState<ModalTrigger>(null);

  useEffect(() => {
    if (hasChanges) {
      window.history.pushState(null, "", window.location.href);
    }
  }, [hasChanges]);

  useEffect(() => {
    const handlePopState = () => {
      if (hasChanges) {
        setTriggerType("popstate");
        setIsModalOpen(true);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasChanges]);

  const handleBackClick = () => {
    if (hasChanges) {
      setTriggerType("button");
      setIsModalOpen(true);
    } else {
      onButtonConfirm();
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (triggerType === "popstate") {
      onPopstateConfirm();
    } else if (triggerType === "button") {
      onButtonConfirm();
    }
    setTriggerType(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    window.history.pushState(null, "", window.location.href);
    setTriggerType(null);
  };

  return {
    isModalOpen,
    handleBackClick,
    handleModalConfirm,
    handleModalCancel,
  };
}
