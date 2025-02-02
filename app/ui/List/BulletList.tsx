interface BulletListProps {
  items: Array<string>;
}

export default function BulletList(props: BulletListProps) {
  const { items } = props;
  return (
    <ul className="flex list-disc flex-col gap-2 pl-4 font-pretendard text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
      {items.map((el, idx) => (
        <li key={idx} className="pl-1">
          {el}
        </li>
      ))}
    </ul>
  );
}
