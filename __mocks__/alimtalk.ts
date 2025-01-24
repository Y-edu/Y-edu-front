import { HttpResponse, http } from "msw";

export const alimtalkhandlers: ReturnType<
  typeof http.get | typeof http.post | typeof http.patch
>[] = [
  http.get("http://localhost:3000/api/matching/:id", () => {
    return HttpResponse.json({
      status: "SUCCESS",
      data: {
        subject: ["영어"],
        displayName: "매칭닉네임122",
        createdAt: "2021-08-31T07:00:00.000Z",
        location: ["서대문구"],
      },
    });
  }),
  http.get("http://localhost:3000/api/matching/:id/acceptance", () => {
    const acceptanceData = Array.from({ length: 25 }, (_, index) => {
      const isAccepted = index % 2 === 0;
      return {
        status: "SUCCESS",
        data: {
          status: isAccepted ? "ACCEPTED" : "REJECTED",
          nickname: isAccepted ? `올리버${index}` : `제임스${index}`,
          userId: 121412412400 + index,
          id: 1241251512600 + index,
          name: isAccepted ? "김현철" : "이영희",
          allReceiveAccetance: Math.floor(Math.random() * 50),
          receiveAccetance: Math.floor(Math.random() * 25),
          rejectReason: isAccepted ? null : "거절 사유 예시",
          lastUpdated: new Date(
            Date.now() - Math.floor(Math.random() * 10000000000),
          ).toISOString(),
        },
      };
    });

    return HttpResponse.json({
      status: "SUCCESS",
      data: acceptanceData,
    });
  }),
  http.post(
    "http://localhost:3000/api/matching/:id/acceptance",
    async ({ request }) => {
      const response = await request.json();
      if (!response) {
        return HttpResponse.json({
          status: "ERROR",
          data: null,
        });
      }
      return HttpResponse.json({ status: "SUCCESS", data: null });
    },
  ),
  http.post(
    "http://localhost:3000/api/matching/:id/acceptance/new",
    async ({ request }) => {
      const response = await request.json();
      if (!response) {
        return HttpResponse.json({
          status: "ERROR",
          data: null,
        });
      }
      return HttpResponse.json({ status: "SUCCESS", data: null });
    },
  ),
  http.patch(
    "http://localhost:3000/api/matching/:id/display_name",
    async ({ request }) => {
      const response = await request.json();
      if (!response) {
        return HttpResponse.json({
          status: "ERROR",
          data: null,
        });
      }
      return HttpResponse.json({
        status: "SUCCESS",
        data: {
          display_name: "매칭닉네임1222131232",
        },
      });
    },
  ),
];
