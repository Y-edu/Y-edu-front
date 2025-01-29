interface CategoryFilterProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onChange: (newValues: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  title,
  options,
  selectedValues,
  onChange,
}) => {
  const handleCheckboxChange = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((val) => val !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  return (
    <div className="mb-4 flex flex-row border-b border-gray-300 pb-4">
      <div className="flex w-full flex-row">
        <div className="mr-4 rounded bg-primary px-2 py-1 text-lg font-bold text-white">
          {title}
        </div>
        <div className="flex flex-row gap-4">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="size-4 accent-blue-500"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
