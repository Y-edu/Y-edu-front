import { HttpResponse, http } from "msw";

export const parentRequestHandler: ReturnType<typeof http.get> = http.get(
  "http://localhost:3000/api/users/request/:id",
  () => {
    return HttpResponse.json({
      data: {
        classTime: "주2회 50분",
        amount: 24,
        childAge: "초등 1학년",
        subject: "ENGLISH",
        faceToFace: true,
        teacherGender: "여",
        address: "마포구 신수동 레미안 파트 1004동 703호",
        purpose: "라이팅, 리딩, 스피킹",
        childLevel: "상",
        condition:
          "Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자",
        preferredStyle:
          "Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자",
        directivity:
          "Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자Lorem 최대 200자",
      },
    });
  },
);
