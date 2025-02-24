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
            imgSrc="/images/exampleProfile.jpeg"
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
                      가장 중요하게 생각하는 교육자입니다. 단순한 문제
                      풀이보다는 원리를 이해하고 스스로 사고할 수 있도록
                      유도하는 수업을 지향합니다. 학생 개개인의 성향과 학습
                      스타일을 분석하여 맞춤형 커리큘럼을 제공하며, 유아부터
                      중등까지 폭넓은 교육 경험을 쌓아왔습니다. 학습에 대한
                      흥미를 잃지 않도록 재미있고 유익한 수업을 구성하며,
                      학생들의 성취감을 극대화할 수 있도록 지도합니다. 제 수업을
                      통해 학생들이 스스로 문제를 해결하는 힘을 기르고, 학습의
                      즐거움을 느낄 수 있도록 돕겠습니다.
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
                          title={`${subject === "english" ? "영어" : "수학"} 수업(3년)`}
                          items={[
                            "초4 영어 문법 및 독해 과외 2023.3 - 2024.5",
                            "중1 영어 내신 대비 과외 2022.9 - 2023.12",
                            "초6 영어 독해 및 쓰기 지도 2020.3 - 2021.12",
                            "영어 학원 초등부 강사 2018.3 - 2020.2",
                          ]}
                        />
                        <ToggleBox
                          title="해외 경험"
                          items={[
                            "미국 뉴욕 어학연수 및 교육 프로그램 참여 2017.8 - 2018.12",
                            "필리핀 마닐라 ESL 과정 수료 2015.3 - 2016.7",
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
                            저는 학생 개개인의 성향에 맞게 세심하게 접근합니다.
                            각자의 강점과 약점을 파악하여 학습자료를 준비하고
                            조언을 제시합니다. 학생과 적극적으로 소통하여
                            요구되는 도움이 무엇인지 파악하고 학생이 이해할
                            때까지 충분히 설명합니다. 또한, 편한 분위기 속에서
                            학습하고 질문할 수 있는 환경을 만들어줍니다. 꾸준히
                            함께하며 옆에서 목표 달성을 할 수 있도록 동기부여를
                            시켜줄 수 있습니다
                          </p>
                        </div>
                        <div className="flex flex-col gap-[12px]">
                          <IconTitleChip
                            title="자존감 지킴이 선생님"
                            icon={TEACHER_STYLE_ICON["자존감 지킴이 선생님"]}
                          />
                          <p className="text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
                            학생들의 학습을 효과적으로 이끌기 위해선 개별적인
                            학습 패턴을 세심하게 분석하고, 작은 실수 하나까지도
                            놓치지 않는 꼼꼼한 지도 방식이 필요합니다. 저는
                            학생들이 학습 과정에서 놓치기 쉬운 개념들을
                            정리하고, 오답을 체계적으로 분석하여 다시 실수하지
                            않도록 지도합니다. 예를 들어, 문법 수업에서는 단순
                            암기가 아닌 문장의 구조를 분석하며, 반복 학습을 통해
                            개념을 확실히 익히도록 도왔습니다. 또한 수학
                            수업에서는 학생이 문제를 풀어나가는 과정을 세밀하게
                            살펴 오답 원인을 분석하고, 같은 실수를 반복하지
                            않도록 맞춤형 피드백을 제공합니다. 학생들이 스스로
                            학습하는 힘을 기를 수 있도록 꼼꼼한 피드백과 세심한
                            학습 계획을 제공합니다.
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
                    학생이 흥미를 느끼며 영어로 말하는 것을 자연스레 터득할 수
                    있도록 도와줍니다. 매수업 시작은 항상 오늘 하루가 어땠는지,
                    일주일간 재미있거나 기억에 남는 일이 무엇이었는지 등 일상
                    대화를 영어로 표현할 수 있는 시간을 갖습니다. 또한 다양한
                    상황 속 역할극을 통해 상황별 필요한 단어나 표현들을 배울 수
                    있도록 지도합니다.
                    <br />
                    <br />
                    Reading: 학생의 수준에 맞는 영어 책을 선정하여 읽고 각
                    페이지에 나오는 모르는 단어들은 빠짐없이 정리하여 주제별
                    단어를 습득할 수 있도록 도와줍니다. 책의 내용에서 나온
                    주제로 대화를 나누며 더 나아가 학생 본인의 경험을 이야기 할
                    수 있도록 유도하여 스피킹의 연장선까지 갈 수 있도록 합니다.
                    <br />
                    <br />
                    Writing: 학생의 나이와 수준에 맞게 접근하는 것이 중요합니다.
                    유치원에서 초등 저학년까지는 영어로 글쓰기를 접해보지
                    못했거나 경험이 많지는 않을 것이기 때문에 학생들이 흥미를
                    느낄 수 있는 단어나 주제를 선정하여 짧은 문장쓰기, 플래시
                    카드로 단어공부/메모리 게임하기 등의 창의적인 방법으로
                    학생들의 흥미를 높여주되 기초적인 글쓰기 능력은 키울 수
                    있도록 도와줍니다. 초등 고학년의 경우에는 하나의 주제를
                    가지고 본인의 생각을 더 구체적으로 paragraph의 형태로 서술할
                    수 있도록 도와줍니다. 본인의 생각을 논리적으로 표현할 수
                    있게 문장 구조를 설명해주고 특정 주제에 대하여 찬반 의견을
                    쓰고 뒷받침 논리까지 전개하는 체계적이고 설득력 있는
                    글쓰기를 할 수 있도록 도와줍니다. 학생들이 쓴 글에는 항상
                    피드백을 제공하여 틀린 부분을 고치고 다시 쓰게 하는 과정을
                    꼭 거쳐서 발전된 글을 쓸 수 있도록 지도합니다.
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
                  }).every(
                    (times) => times.length === 1 && times[0] === "불가",
                  ) && (
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
