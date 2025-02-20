"use client";

import { useGetParentsRequest } from "@/hooks/query/useGetParentsRequest";
import { Accordion, TitleDesc } from "@/ui";
import { PARENTS_REQUEST_TITLE } from "@/constants/parentsRequest";
import { formatMonthlyFee } from "@/utils/formatMonthlyFee";

function ParentsRequest({ applicationFormId }: { applicationFormId: string }) {
  const { data } = useGetParentsRequest(applicationFormId);

  return (
    <Accordion
      visibleContent={
        <div className="flex w-full justify-between">
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.classTime}
            desc={
              data
                ? `${data.classCount} ${data.classTime} / ${formatMonthlyFee(data.pay)}`
                : "수업 시수"
            }
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.childAge}
            desc={data ? data.age : "아이 나이"}
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.classType}
            desc={data ? `${data.wantedSubject} / ${data.online}` : "과외 유형"}
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.teacherGender}
            desc={data ? data.favoriteGender : "성별"}
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.address}
            desc={data ? data.district + data.dong : "주소"}
            maxWidth="1/5"
            direction="vertical"
          />
        </div>
      }
      hiddenContent={
        <div className="mb-4 flex flex-col gap-3">
          <div className="flex gap-20">
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.classPurpose}
              desc={
                data
                  ? data.goals.map((purpose) => purpose).toString()
                  : "과외 목적"
              }
              maxWidth="1/5"
              direction="horizontal"
            />
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.childLevel}
              desc={data ? data.age : "아이 레벨"}
              maxWidth="1/5"
              direction="horizontal"
            />
          </div>
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.teacherCondition}
            desc={data ? data.teacherStyle : "선생님 조건"}
            maxWidth="full"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.teacherStyle}
            desc={data ? data.teacherStyle : "선생님 스타일"}
            maxWidth="full"
            direction="vertical"
          />
          {/* <TitleDesc
            title={PARENTS_REQUEST_TITLE.directivity}
            desc={data ? data.directivity : "원하는 방향성"}
            maxWidth="full"
            direction="vertical"
          /> */}
        </div>
      }
    />
  );
}

export default ParentsRequest;
