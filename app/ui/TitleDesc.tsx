interface TitleDescProps {
  title: string;
  desc: string;
  maxWidth: string;
  direction: "vertical" | "horizontal";
}

export function TitleDesc(props: TitleDescProps) {
  const { title, desc, maxWidth, direction } = props;

  return (
    <div
      className={`flex ${direction === "vertical" ? "flex-col" : "gap-2"} w-${maxWidth}`}
    >
      <p className="text-titleColor">{title}</p>
      <p className="text-descColor">{desc}</p>
    </div>
  );
}
