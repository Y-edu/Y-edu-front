interface BulletListProps {
  items: Array<string>;
  className?: string;
}

export default function BulletList(props: BulletListProps) {
  const { items = [], className = "" } = props;

  const containerClassName = `flex list-disc flex-col gap-2 pl-4 font-pretendard text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal ${className}`;

  return (
    <ul className={containerClassName}>
      {items.map((el, idx) => (
        <li key={idx} className="pl-1">
          {el}
        </li>
      ))}
    </ul>
  );
}
