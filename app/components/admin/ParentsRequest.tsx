"use client";

import { useGetParentsRequest } from "@/hooks/query/useGetParentsRequest";
import { Accordion, TitleDesc } from "@/ui";
import { PARENTS_REQUEST_TITLE } from "@/constants/parentsRequest";
import { formatMonthlyFee } from "@/utils/formatMonthlyFee";
import { formatFirstClassInfo } from "@/utils/formatFirstClassInfo";

function ParentsRequest({ applicationFormId }: { applicationFormId: string }) {
  const { data } = useGetParentsRequest(applicationFormId);
  const detailAddress = data.online ? data.district : data.district + data.dong;

  const isConfirmed =
    data?.scheduledClasses && data.scheduledClasses.length > 0;

  return (
    <Accordion
      visibleContent={
        <div className="flex flex-col gap-4">
          <div className="mb-2 flex gap-10 overflow-x-auto whitespace-nowrap">
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.classTime}
              desc={
                data
                  ? `${data.classCount} ${data.classTime} / ${formatMonthlyFee(data.pay)}`
                  : "수업 시수"
              }
              maxWidth="1/7"
              direction="vertical"
            />
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.childAge}
              desc={data ? data.age : "아이 나이"}
              maxWidth="1/7"
              direction="vertical"
            />
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.classType}
              desc={
                data ? `${data.wantedSubject} / ${data.online}` : "과외 유형"
              }
              maxWidth="1/7"
              direction="vertical"
            />
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.teacherGender}
              desc={data ? data.favoriteGender : "성별"}
              maxWidth="1/7"
              direction="vertical"
            />
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.address}
              desc={detailAddress}
              maxWidth="1/7"
              direction="vertical"
            />
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.dong}
              desc={data?.dong || "동"}
              maxWidth="1/7"
              direction="vertical"
            />
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.wantTime}
              desc={data ? data.wantTime : "원하는 수업시간"}
              maxWidth="1/7"
              direction="vertical"
            />
          </div>
          {isConfirmed && (
            <div className="mb-2 flex gap-10 overflow-x-auto whitespace-nowrap">
              <TitleDesc
                title={PARENTS_REQUEST_TITLE.scheduledClasses}
                desc={
                  data?.scheduledClasses
                    ?.map((cls) => {
                      const hour = parseInt(cls.startTime.split(":")[0], 10);
                      return `${cls.day} ${hour}시부터 (${cls.classTime}분)`;
                    })
                    ?.join(",\n") || "상담결과 미전달"
                }
                maxWidth="1/5"
                direction="vertical"
              />
              <TitleDesc
                title={PARENTS_REQUEST_TITLE.textBook}
                desc={data.textBook ? data.textBook : "상담결과 미전달"}
                maxWidth="1/5"
                direction="vertical"
              />
              <TitleDesc
                title={PARENTS_REQUEST_TITLE.firstClassInfo}
                desc={
                  data?.firstDay && data?.firstDayStart
                    ? formatFirstClassInfo(data.firstDay, data.firstDayStart)
                    : "상담결과 미전달"
                }
                maxWidth="1/5"
                direction="vertical"
              />
            </div>
          )}
        </div>
      }
      hiddenContent={
        <div className="mb-4 flex flex-col gap-3">
          <div className="flex gap-4">
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.classPurpose}
              desc={data ? data.goals.join(", ") : "과외 목적"}
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
