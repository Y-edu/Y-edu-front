interface ToggleSwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <label className="relative inline-block h-6 w-10" aria-label="토글 스위치">
      <input type="checkbox" className="peer size-0 opacity-0" {...props} />
      <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-blue-500" />
      <span className="absolute left-1 top-1 size-4 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-4" />
    </label>
  );
}
