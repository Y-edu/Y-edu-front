import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { getQueryClient } from "@/utils/getQueryClient";
import {
  getTeacherDetailsAvailable,
  getTeacherDetailsClass,
  getTeacherDetailsTeacher,
} from "@/actions/get-teacher-detail";

import TeacherPage from "./TeacherPage";

export default async function HydrationTeacherDetail({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams: {
    [key: string]: string;
  };
}) {
  const queryClient = getQueryClient();
  const paramsProps = {
    teacherId: String(params.id),
    subject: searchParams.subject as "english" | "math",
  };

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ["teacher-details-teacher", paramsProps],
      queryFn: async () => {
        const res = await getTeacherDetailsTeacher(paramsProps);
        return res;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["teacher-details-class", paramsProps],
      queryFn: async () => {
        const res = await getTeacherDetailsClass(paramsProps);
        return res;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["teacher-details-available", paramsProps],
      queryFn: async () => {
        const res = await getTeacherDetailsAvailable({
          teacherId: params.id,
        });
        return res;
      },
    }),
  ]);

  const dehydrateState = dehydrate(queryClient);
  return (
    <Suspense fallback={<div />}>
      <HydrationBoundary state={dehydrateState}>
        <TeacherPage />
      </HydrationBoundary>
    </Suspense>
  );
}
