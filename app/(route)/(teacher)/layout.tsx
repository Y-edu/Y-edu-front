export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-[375px] px-4">{children}</div>;
}
