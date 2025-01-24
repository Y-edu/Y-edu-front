import Accordion from "../ui/Accordion";
import TitleDesc from "../ui/TitleDesc";

export default function Home() {
  return (
    <div className="ml-[180px] p-4 pt-2 font-pretendard">
      <Accordion
        visibleContent={
          <div className="flex w-full justify-between">
            <TitleDesc title="아이 나이" desc="초등 1학년" maxWidth="1/5" />
            <TitleDesc title="아이 나이" desc="초등 1학년" maxWidth="1/5" />
            <TitleDesc title="아이 나이" desc="초등 1학년" maxWidth="1/5" />
            <TitleDesc title="아이 나이" desc="초등 1학년" maxWidth="1/5" />
            <TitleDesc title="아이 나이" desc="초등 1학년" maxWidth="1/5" />
          </div>
        }
        hiddenContent={
          <div className="mb-4 flex flex-col gap-3">
            <TitleDesc
              title="선호 수업 스타일"
              desc="너무 차분하거나 혹은 너무 하이톤에 말이 많은분은 원치 않습니다. 아이가 집중하지 못해요. 또한 아이한테 휘둘리지 않고 주어진 시간에 집중하게하며 수업가능하신분.  / 미국식 영어로 수업할수 있는분 / 배경지식이 많아 아이가 질문했을때 쉽게 설명해주시는분 / 부족한 부분을 잘할수있는 방법또한 끌어 주실수 있는분 / 남 여 상관은 없지만, 여성분이면 더 섬세할것 같습니다."
              maxWidth="full"
            />
            <TitleDesc
              title="선호 수업 스타일"
              desc="너무 차분하거나 혹은 너무 하이톤에 말이 많은분은 원치 않습니다. 아이가 집중하지 못해요. 또한 아이한테 휘둘리지 않고 주어진 시간에 집중하게하며 수업가능하신분.  / 미국식 영어로 수업할수 있는분 / 배경지식이 많아 아이가 질문했을때 쉽게 설명해주시는분 / 부족한 부분을 잘할수있는 방법또한 끌어 주실수 있는분 / 남 여 상관은 없지만, 여성분이면 더 섬세할것 같습니다."
              maxWidth="full"
            />
            <TitleDesc
              title="선호 수업 스타일"
              desc="너무 차분하거나 혹은 너무 하이톤에 말이 많은분은 원치 않습니다. 아이가 집중하지 못해요. 또한 아이한테 휘둘리지 않고 주어진 시간에 집중하게하며 수업가능하신분.  / 미국식 영어로 수업할수 있는분 / 배경지식이 많아 아이가 질문했을때 쉽게 설명해주시는분 / 부족한 부분을 잘할수있는 방법또한 끌어 주실수 있는분 / 남 여 상관은 없지만, 여성분이면 더 섬세할것 같습니다."
              maxWidth="full"
            />
          </div>
        }
      />
    </div>
  );
}
