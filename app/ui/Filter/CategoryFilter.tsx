export type OptionType = string | { value: string; label: string };

interface CategoryFilterProps {
  title: string;
  options: OptionType[];
  selectedValues: string[];
  onChange: (newValues: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  title,
  options,
  selectedValues,
  onChange,
}) => {
  const handleCheckboxChange = (optionValue: string) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((val) => val !== optionValue));
    } else {
      onChange([...selectedValues, optionValue]);
    }
  };

  const getOptionValue = (option: OptionType): string =>
    typeof option === "string" ? option : option.value;
  const getOptionLabel = (option: OptionType): string =>
    typeof option === "string" ? option : option.label;

  return (
    <div className="mb-4 flex flex-row border-b border-gray-300 pb-4">
      <div className="flex w-full flex-row">
        <div className="mr-4 rounded bg-primary px-2 py-1 text-lg font-bold text-white">
          {title}
        </div>
        <div className="flex flex-row gap-4">
          {options.map((option) => {
            const value = getOptionValue(option);
            const label = getOptionLabel(option);
            return (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => handleCheckboxChange(value)}
                  className="size-4 accent-blue-500"
                />
                <span className="text-sm">{label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
