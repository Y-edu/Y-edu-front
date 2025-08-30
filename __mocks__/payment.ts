import { HttpResponse, http } from "msw";

export const paymentHandlers = [
  // 결제 요청 API
  http.post("*/payments/request/class-matching-ids", async ({ request }) => {
    const body = await request.json();

    // 성공 응답 시뮬레이션
    return HttpResponse.json(
      {
        success: true,
        message: "결제 요청이 성공적으로 처리되었습니다.",
        requestId: `PAY_${Date.now()}`,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    );
  }),

  // OPTIONS 요청 처리 (Preflight)
  http.options("*/payments/request/class-matching-ids", () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }),

  // 결제 상태 조회 (필요하다면)
  http.get("*/payments/status/:requestId", ({ params }) => {
    return HttpResponse.json({
      requestId: params.requestId,
      status: "completed",
      amount: 100000,
    });
  }),
];
