import { Sidebar } from "../../ui";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ml-[180px] bg-background">
      <Sidebar />
      {children}
    </div>
  );
}
