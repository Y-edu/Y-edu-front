const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#527DFF",
        primaryLight: "#F3F7FF",
        primaryWeak: "#EBEEF3",
        labelStrong: "#191F28",
        labelNormal: "#3C434F",
        labelAssistive: "#9B999F",
        headColor: "#333B69",
        titleColor: "#232323",
        descColor: "#718EBF",
        disabled: "#D9D9D9",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
};
export default config;
