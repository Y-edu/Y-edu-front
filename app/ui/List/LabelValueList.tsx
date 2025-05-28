export interface Item {
  label: string;
  value: string;
}

export default function LabelValueList({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-y-3 rounded-xl bg-white p-4">
      {items.map(({ label, value }, index) => (
        <div key={index} className="grid grid-cols-[auto_1fr] gap-x-14">
          <span className="min-w-40 text-lg text-gray-500">{label}</span>
          <span className="text-lg text-gray-900">{value}</span>
        </div>
      ))}
    </div>
  );
}
