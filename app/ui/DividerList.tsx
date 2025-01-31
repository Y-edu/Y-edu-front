interface DividerListProps {
  textList: Array<string>;
}

export default function DividerList(props: DividerListProps) {
  const { textList } = props;

  return (
    <div className="bg-primaryLight flex flex-col divide-y divide-white px-5 py-[18px]">
      {textList.map((el, idx) => (
        <div
          key={idx}
          className="text-labelStrong px-6 py-[18px] text-center font-pretendard text-[15px] font-medium leading-[152%] tracking-[-0.02em]"
        >
          {el}
        </div>
      ))}
    </div>
  );
}
