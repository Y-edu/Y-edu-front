import { useMemo, useState } from "react";

export function useTextareaWithMaxLength(maxLength?: number) {
  const [value, setValue] = useState("");
  const error = useMemo(() => {
    if (maxLength && value.length > maxLength) {
      return `${maxLength}자 이내로 적어주세요`;
    }
    return "";
  }, [value, maxLength]);

  const onChange = (newValue: string) => {
    if (maxLength && newValue.length > maxLength + 1) return;
    setValue(newValue);
  };

  return {
    value,
    error,
    onChange,
  };
}
