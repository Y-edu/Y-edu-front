interface BulletListProps {
  items: Array<string>;
}

export default function BulletList(props: BulletListProps) {
  const { items } = props;
  return (
    <ul className="text-labelNormal flex list-disc flex-col gap-2 font-pretendard text-[15px] leading-[156%] tracking-[-0.02em]">
      {items.map((el, idx) => (
        <li key={idx} className="pl-1">
          {el}
        </li>
      ))}
    </ul>
  );
}
