"use client";

import { useGetParentsRequest } from "../../hooks/query/useGetParentsRequest";
import { Accordion, TitleDesc } from "../../ui";
import { PARENTS_REQUEST_TITLE } from "../../constants/parentsRequest";

function ParentsRequest() {
  const { data } = useGetParentsRequest("abc123");

  return (
    <Accordion
      visibleContent={
        <div className="flex w-full justify-between">
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.classTime}
            desc={data ? `${data.classTime} / ${data.amount}만원` : "수업 시수"}
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.childAge}
            desc={data ? data.childAge : "아이 나이"}
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.classType}
            desc={
              data
                ? `${data.subject} / ${data.faceToFace ? "대면" : "비대면"}`
                : "과외 유형"
            }
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.teacherGender}
            desc={data ? data.teacherGender : "성별"}
            maxWidth="1/5"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.address}
            desc={data ? data.address : "주소"}
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
              desc={data ? data.purpose : "과외 목적"}
              maxWidth="1/5"
              direction="horizontal"
            />
            <TitleDesc
              title={PARENTS_REQUEST_TITLE.childLevel}
              desc={data ? data.childLevel : "아이 레벨"}
              maxWidth="1/5"
              direction="horizontal"
            />
          </div>
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.teacherCondition}
            desc={data ? data.condition : "선생님 조건"}
            maxWidth="full"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.teacherStyle}
            desc={data ? data.preferredStyle : "선생님 스타일"}
            maxWidth="full"
            direction="vertical"
          />
          <TitleDesc
            title={PARENTS_REQUEST_TITLE.directivity}
            desc={data ? data.directivity : "원하는 방향성"}
            maxWidth="full"
            direction="vertical"
          />
        </div>
      }
    />
  );
}

export default ParentsRequest;
