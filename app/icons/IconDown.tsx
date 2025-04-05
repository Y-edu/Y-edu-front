import { SVGProps } from "react";

interface IconDownProps extends SVGProps<SVGSVGElement> {
  IconColor?: string | false;
}

export default function IconDown({ IconColor, ...props }: IconDownProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 9.5L12 15.5L18 9.5"
        stroke={IconColor || "#94A3B8"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
