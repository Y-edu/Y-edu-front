interface TitleDescProps {
  title: string;
  desc: string;
  maxWidth: string;
  // maxHeight
}

function TitleDesc(props: TitleDescProps) {
  const { title, desc, maxWidth } = props;

  return (
    <div className={`flex flex-col w-${maxWidth}`}>
      <p className="text-titleColor">{title}</p>
      <p className="text-descColor">{desc}</p>
    </div>
  );
}

export default TitleDesc;
