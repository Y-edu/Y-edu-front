import { SVGProps } from "react";

interface IconCheckProps extends SVGProps<SVGSVGElement> {
  isFill?: boolean;
}

export default function IconRoundCheck({
  isFill = false,
  ...props
}: IconCheckProps) {
  const bgColor = isFill ? "#3265FD" : "none";
  const checkColor = isFill ? "white" : "#CBD5E1";
  const borderColor = isFill ? "#3265FD" : "#CBD5E1";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={bgColor}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_3798_3607)">
        <rect
          x="1"
          y="1"
          width="22"
          height="22"
          rx="11"
          stroke={borderColor}
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.4768 10.4207C16.5846 10.3056 16.6687 10.1705 16.7242 10.023C16.7798 9.87543 16.8057 9.7184 16.8006 9.56084C16.7955 9.40327 16.7594 9.24826 16.6943 9.10466C16.6293 8.96105 16.5366 8.83166 16.4216 8.72387C16.3066 8.61608 16.1714 8.532 16.0239 8.47644C15.8764 8.42088 15.7193 8.39492 15.5618 8.40005C15.4042 8.40517 15.2492 8.44129 15.1056 8.50632C14.962 8.57135 14.8326 8.66403 14.7248 8.77907L11.0252 12.7271L9.19759 11.1035C8.95814 10.9044 8.65069 10.8062 8.34019 10.8297C8.02969 10.8531 7.74045 10.9963 7.53358 11.229C7.32671 11.4617 7.2184 11.7658 7.23154 12.0769C7.24468 12.388 7.37823 12.6818 7.60399 12.8963L10.304 15.2963C10.5376 15.5038 10.843 15.612 11.1551 15.5979C11.4673 15.5838 11.7617 15.4484 11.9756 15.2207L16.4768 10.4207Z"
          fill={checkColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_3798_3607">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
