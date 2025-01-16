import { HttpResponse, http } from "msw";

export const handlers = [
  //테스트용 모든 핸들러 정의
  http.get("http://localhost:3000/api/users", async () => {
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];
