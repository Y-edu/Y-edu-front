"use client";

import { useGetParentsRequest } from "@/hooks/query/useGetParentsRequest";
import { Accordion, TitleDesc } from "@/ui";
import { PARENTS_REQUEST_TITLE } from "@/constants/parentsRequest";
import { formatMonthlyFee } from "@/utils/formatMonthlyFee";

function ParentsRequest({ applicationFormId }: { applicationFormId: string }) {
  const { data } = useGetParentsRequest(applicationFormId);
  const detailAddress = data.online ? data.district : data.district + data.dong;

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
            desc={detailAddress}
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.dong}
            desc={data.dong}
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.wantTime}
            desc={data.wantTime}
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
              title={PARENTS_REQUEST_TITLE.referral}
              desc={data ? data.referral : "알게된 경로"}
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
        </div>
      }
    />
  );
}

export default ParentsRequest;
