const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#527DFF",
        primaryNormal: "#3265FD",
        primaryLight: "#F3F7FF",
        primaryWeak: "#EBEEF3",
        primaryTint: "#EEF4FF",
        primaryPale: "#F5F7FA",
        labelStrong: "#191F28",
        labelNormal: "#3C434F",
        labelNeutral: "#757679",
        labelAssistive: "#9B999F",
        headColor: "#333B69",
        titleColor: "#232323",
        descColor: "#718EBF",
        disabled: "#D9D9D9",
        tabBarBorder: "#F0F2F6",
        statusInactive: "#F4F4F5",
        grey: {
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          800: "#1E293B",
          900: "#0F172A",
        },
        warning: "#FF4848",
      },
      fontFamily: {
        pretendard: ['"var(--font-pretendard)"'],
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-up": "slide-up 300ms ease-out forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
