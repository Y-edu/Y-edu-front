import DivWithLabel from "@/components/result/DivWIthLabel";
import { HOMEWORK_PROGRESS_LIST } from "@/constants/session/homework";
import Radio from "@/ui/Radio";
import Textarea from "@/ui/Textarea";
import TitleSection from "@/ui/TitleSection";

export default function SessionComplete() {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-5 flex flex-col gap-10">
        <TitleSection>
          <TitleSection.Title>수업을 간략히 리뷰해주세요</TitleSection.Title>
          <TitleSection.Description>
            작성하신 내용은 학부모님께 전달됩니다
          </TitleSection.Description>
        </TitleSection>
        <DivWithLabel label="아이가 숙제를 모두 완료했나요?" className="w-full">
          {HOMEWORK_PROGRESS_LIST.map((item) => (
            <div key={item.value} className="py-4">
              <Radio
                label={item.label}
                selected={false}
                onClick={() => {}}
                {...(item.value !== 0 && {
                  subLabel: `${item.value}%`,
                })}
              />
            </div>
          ))}
        </DivWithLabel>
      </div>
      {/* 아래는 그냥 divider */}
      <div className="-mx-5 border-t-8 border-gray-100" />
      <DivWithLabel label="아이의 이해도" className="mb-40 mt-5">
        <Textarea
          value=""
          onChange={() => {}}
          placeholder={`예) 'I go to bed at 9'처럼 일상 표현은 금방 따라왔지만, 의문문으로 바꾸는 건 어려워했어요.`}
        />
      </DivWithLabel>
    </div>
  );
}
