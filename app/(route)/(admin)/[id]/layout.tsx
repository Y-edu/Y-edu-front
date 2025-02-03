import { PropsWithChildren, ReactNode } from "react";

type LayoutProps = PropsWithChildren & {
  adminHeader: ReactNode;
  alim: ReactNode;
} & {
  params: {
    id: string;
  };
};

const Layout = ({ adminHeader, alim, children }: LayoutProps) => {
  return (
    <div>
      {adminHeader}
      {alim}
      {children}
    </div>
  );
};

export default Layout;
