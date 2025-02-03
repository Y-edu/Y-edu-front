export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-[375px]">{children}</div>;
}
