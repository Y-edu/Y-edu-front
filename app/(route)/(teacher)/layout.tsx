import Head from "next/head";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <div className="mx-auto max-w-[375px]">{children}</div>
    </>
  );
}
