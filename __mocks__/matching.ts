import { HttpResponse, http } from "msw";

export const matchingHandlers: ReturnType<typeof http.get>[] = [
  http.get("http://localhost:3000/api/teacher/:id/matching/:matchingId", () => {
    return HttpResponse.json({
      data: {
        online: false,
        subject: "ENGLISH",
        district: "서대문구",
        dong: "홍은동",
        detail: "가온로 101동 101호",
        classCount: 3,
        classTime: 100,
        goal: "라이팅,리딩",
        wantTime: "화,목 오후 6시 이후",
        age: "초등학교 2학년",
        wantDirection:
          "고려대학교에서 사회학을 공부하고 있고 학원, 개인과외, 영어캠프 등 다양한 경로로 아이들을 가르쳐왔습니다. 학생들이 즐겁게 배울 수 있도록 최선을 다하고 있으며, 각자의 학습 스타일에 맞춘 지도를 중요하게 생각합니다.고려대학교에서 사회학을 공부하고 있고 학원, 개인과외, 영어캠프 등 다양한 경로로 아이들을 가르쳐왔습니다. 학생들이 즐겁게 배울 수 있도록 최선을 다하고 있으며, 각자의 학습 스타일에 맞춘 지도를 중요하게 생각합니다.고려대학교에서 사회학을 공부하고 있고 학원, 개인과외, 영어캠프 등 다양한 경로로 아이들을 가르쳐왔습니다. 학생들이 즐겁게 배울 수 있도록 최선을 다하고 있으며, 각자의 학습 스타일에 맞춘 지도를 중요하게 생각합니다.고려대학교에서 사회학을 공부하고 있고 학원, 개인과외, 영어캠프 등 다양한 경로로 아이들을 가르쳐왔습니다. 학생들이 즐겁게 배울 수 있도록 최선을 다하고 있으며, 각자의 학습 스타일에 맞춘 지도를 중요하게 생각합니다.",
        favoriteCondition:
          "고려대학교에서 사회학을 공부하고 있고 학원, 개인과외, 영어캠프 등 다양한 경로로 아이들을 가르쳐왔습니다. 학생들이 즐겁게 배울 수 있도록 최선을 다하고 있으며, 각자의 학습 스타일에 맞춘 지도를 중요하게 생각합니다.",
      },
    });
  }),
  http.post(
    "http://localhost:3000/api/teacher/:id/matching/:matchingId/accept",
    () => {
      return HttpResponse.json({
        data: "수락되었습니다",
        status: "SUCCESS",
      });
    },
  ),
  http.post(
    "http://localhost:3000/api/teacher/:id/matching/:matchingId/refuse",
    () => {
      return HttpResponse.json({
        data: "거절되었습니다.",
        status: "SUCCESS",
      });
    },
  ),
];
