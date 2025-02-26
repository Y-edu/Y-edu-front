"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import BulletList from "@/ui/List/BulletList";
import TabBar from "@/ui/Bar/TabBar";
import ToggleBox from "@/ui/ToggleBox";
import { SubjectType } from "@/actions/get-teacher-detail";
import { TEACHER_STYLE_ICON } from "@/constants/teacherStyle";
import { formatAvailableTimes } from "@/utils/formatAvailableTimes";
import ProfileInfoBox from "@/components/teacher/ProfileInfoBox";
import IconTitleChip from "@/components/teacher/IconTitleChip";
import ProfileImageName from "@/components/teacher/ProfileImageName";

export default function SampleTeacher() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") as SubjectType;
  return (
    <Suspense>
      <div className="w-full">
        <div className="flex w-full justify-center py-[42px]">
          <ProfileImageName
            imgSrc="/images/exampleProfile.png"
            name="토마스 선생님"
          />
        </div>
        <TabBar
          tabs={[
            {
              trigger: "선생님",
              content: (
                <div className="w-full">
                  <div className="flex flex-col gap-[10px] bg-primaryPale">
                    <ProfileInfoBox title="공부는 작은 성취가 쌓일 때 더 즐거워집니다. 포기하지 말고 함께 성장해봐요! 😊">
                      저는 학생들이 자신감을 가지고 학습할 수 있도록 돕는 것을
                      가장 중요하게 생각해요. 단순한 문제 풀이보다는 원리를
                      이해하고 스스로 사고할 수 있도록 유도하는 수업을 지향해요.
                      학생 개개인의 성향과 학습 스타일을 분석하여 맞춤형
                      커리큘럼을 제공해요.
                    </ProfileInfoBox>
                    <ProfileInfoBox
                      title={
                        <p className="mb-[20px]">
                          선생님의
                          <span className="text-primaryNormal">
                            경력과 경험
                          </span>
                          이에요.
                        </p>
                      }
                    >
                      <div className="flex flex-col gap-[14px]">
                        <ToggleBox
                          title="학력"
                          items={[
                            `연세대학교 언더우드 국제대학 인문사회과학부`,
                            "운정고등학교",
                          ]}
                        />
                        <ToggleBox
                          title={`${subject === "english" ? "영어" : "수학"} 수업(4년)`}
                          items={[
                            "초4 영어 문법 및 독해 과외 (1년)",
                            "중1 영어 내신 대비 과외 (1년)",
                            "초6 영어 독해 및 쓰기 지도 (1년)",
                            "영어 학원 초등부 강사 (1년)",
                          ]}
                        />
                        <ToggleBox
                          title="해외 경험"
                          items={[
                            "미국 뉴욕 어학연수 및 교육 프로그램 참여 (6개월)",
                            "필리핀 마닐라 ESL 과정 수료 (1년)",
                          ]}
                        />
                      </div>
                    </ProfileInfoBox>
                    <ProfileInfoBox
                      title={
                        <p>
                          이런{" "}
                          <span className="text-primaryNormal">스타일</span>의
                          선생님이에요.
                        </p>
                      }
                    >
                      <div className="flex flex-col gap-[22px]">
                        <div className="mt-[18px] flex flex-col gap-[12px]">
                          <IconTitleChip
                            title="꼼꼼한 선생님"
                            icon={TEACHER_STYLE_ICON["꼼꼼한 선생님"]}
                          />
                          <p className="text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
                            저는 학생 개개인의 성향에 맞게 세심하게 접근해요.
                            각자의 강점과 약점을 파악하여 학습 자료를 준비하고
                            조언을 제시해요. 학생과 적극적으로 소통하여 요구되는
                            도움이 무엇인지 파악하고 학생이 이해할 때까지 충분히
                            설명해요. 또한, 편한 분위기 속에서 학습하고 질문할
                            수 있는 환경을 만들어줘요.
                          </p>
                        </div>
                        <div className="flex flex-col gap-[12px]">
                          <IconTitleChip
                            title="자존감 지킴이 선생님"
                            icon={TEACHER_STYLE_ICON["자존감 지킴이 선생님"]}
                          />
                          <p className="text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
                            학생들의 학습을 효과적으로 이끌기 위해서는 개별적인
                            학습 패턴을 세심하게 분석하고, 작은 실수 하나까지도
                            놓치지 않는 꼼꼼한 지도 방식이 필요해요. 학생들이
                            학습 과정에서 놓치기 쉬운 개념들을 정리하고, 오답을
                            체계적으로 분석하여 다시 실수하지 않도록 지도해요.
                            예를 들어, 문법 수업에서는 단순 암기가 아닌 문장의
                            구조를 분석하며, 반복 학습을 통해 개념을 확실히
                            익히도록 도왔어요.
                          </p>
                        </div>
                      </div>
                    </ProfileInfoBox>
                  </div>
                </div>
              ),
            },
            {
              trigger: "수업",
              content: (
                <div className="flex flex-col gap-[10px] bg-primaryPale">
                  <ProfileInfoBox
                    title={
                      <div className="flex flex-col gap-1">
                        <p>
                          <span className="text-primaryNormal">커리큘럼</span>을
                          안내드려요.
                        </p>
                        <p className="text-[15px] font-medium leading-[152%] text-labelAssistive">
                          더 자세한 커리큘럼은 매칭 후 선생님이 안내드려요!
                        </p>
                      </div>
                    }
                  >
                    <br />
                    Speaking: 영어는 자신감이 중요하므로 학생과의 대화를 통해
                    학생이 흥미를 느끼며 영어로 말하는 것을 자연스럽게 터득할 수
                    있도록 도와줘요. 매 수업 시작은 항상 오늘 하루가 어땠는지,
                    일주일간 재미있거나 기억에 남는 일이 무엇이었는지 등 일상
                    대화를 영어로 표현할 수 있는 시간을 갖고 있어요. 이러한
                    접근은 학생들이 영어에 대한 두려움을 줄이고, 자연스럽게
                    의사소통 능력을 향상시키는 데 집중해요.
                    <br />
                    <br />
                    Reading: 학생의 수준에 맞는 영어 책을 선정하여 읽고, 각
                    페이지에 나오는 모르는 단어들은 빠짐없이 정리하여 주제별
                    단어를 습득할 수 있도록 도와줘요. 이렇게 하면 학생들이
                    새로운 어휘를 체계적으로 배우고, 독해 능력을 향상시키는 데
                    큰 도움이 됩니다. 또한, 주제별로 단어를 정리함으로써 관련된
                    내용을 더 잘 이해하고 기억할 수 있도록 해요.
                    <br />
                    <br />
                    Writing: 학생의 나이와 수준에 맞게 접근하는 것이 매우
                    중요해요. 특히 유치원에서 초등 저학년까지의 학생들은 영어로
                    글쓰기를 접해보지 못했거나 경험이 많지 않을 수 있어요.
                    그래서 다음과 같은 방법으로 학생들의 흥미를 높이고 기초적인
                    글쓰기 능력을 키울 수 있어요:
                  </ProfileInfoBox>
                </div>
              ),
            },
            {
              trigger: "지역/시간",
              content: (
                <div className="flex flex-col gap-[10px] bg-primaryPale">
                  <ProfileInfoBox
                    title={
                      <p>
                        이 <span className="text-primaryNormal">지역</span>
                        에서 과외가 가능해요.
                      </p>
                    }
                  >
                    <BulletList
                      items={["온라인", "강남구", "강동구", "성북구", "송파구"]}
                    />
                  </ProfileInfoBox>
                  {Object.values({
                    월: [
                      "14:00:00",
                      "15:00:00",
                      "16:00:00",
                      "17:00:00",
                      "18:00:00",
                      "19:00:00",
                    ],
                    화: [
                      "14:00:00",
                      "15:00:00",
                      "16:00:00",
                      "17:00:00",
                      "18:00:00",
                      "19:00:00",
                    ],
                    수: [
                      "14:00:00",
                      "15:00:00",
                      "16:00:00",
                      "17:00:00",
                      "18:00:00",
                      "19:00:00",
                    ],
                    목: [
                      "14:00:00",
                      "15:00:00",
                      "16:00:00",
                      "17:00:00",
                      "18:00:00",
                      "19:00:00",
                    ],
                    금: [
                      "14:00:00",
                      "15:00:00",
                      "16:00:00",
                      "17:00:00",
                      "18:00:00",
                      "19:00:00",
                    ],
                    토: [],
                    일: [],
                  }).some((times) => times.length > 0) && (
                    <ProfileInfoBox
                      title={
                        <p>
                          선생님이{" "}
                          <span className="text-primaryNormal">
                            선호하는 시간
                          </span>
                          이에요!
                        </p>
                      }
                    >
                      <BulletList
                        items={formatAvailableTimes({
                          월: [
                            "14:00:00",
                            "15:00:00",
                            "16:00:00",
                            "17:00:00",
                            "18:00:00",
                            "19:00:00",
                          ],
                          화: [
                            "14:00:00",
                            "15:00:00",
                            "16:00:00",
                            "17:00:00",
                            "18:00:00",
                            "19:00:00",
                          ],
                          수: [
                            "14:00:00",
                            "15:00:00",
                            "16:00:00",
                            "17:00:00",
                            "18:00:00",
                            "19:00:00",
                          ],
                          목: [
                            "14:00:00",
                            "15:00:00",
                            "16:00:00",
                            "17:00:00",
                            "19:00:00",
                          ],
                          금: [
                            "14:00:00",
                            "15:00:00",
                            "16:00:00",
                            "18:00:00",
                            "19:00:00",
                          ],
                          토: [],
                          일: [],
                        })}
                      />
                    </ProfileInfoBox>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </Suspense>
  );
}
