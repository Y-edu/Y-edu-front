import {
  convertToFirstDay,
  to24HourTime,
  cleanDateString,
  formatFirstDayToDateString,
} from ".";

describe("formatFirstDay 유틸 함수 테스트", () => {
  describe("convertToFirstDay", () => {
    it("Date와 시간 문자열을 FirstDay 객체로 변환한다", () => {
      const date = new Date("2024-01-15");
      const time = "오전 9:30";

      const result = convertToFirstDay(date, time);

      expect(result).toEqual({
        year: 2024,
        month: "1월",
        day: "15일 (월)",
        period: "오전",
        time: "9:30",
      });
    });

    it("오후 시간도 올바르게 변환한다", () => {
      const date = new Date("2024-12-25");
      const time = "오후 2:15";

      const result = convertToFirstDay(date, time);

      expect(result).toEqual({
        year: 2024,
        month: "12월",
        day: "25일 (수)",
        period: "오후",
        time: "2:15",
      });
    });
  });

  describe("to24HourTime", () => {
    it("오전 시간을 24시간 형식으로 변환한다", () => {
      expect(to24HourTime("오전", "9:30")).toBe("09:30:00");
      expect(to24HourTime("오전", "12:00")).toBe("00:00:00");
      expect(to24HourTime("오전", "1:15")).toBe("01:15:00");
    });

    it("오후 시간을 24시간 형식으로 변환한다", () => {
      expect(to24HourTime("오후", "2:30")).toBe("14:30:00");
      expect(to24HourTime("오후", "12:00")).toBe("12:00:00");
      expect(to24HourTime("오후", "11:45")).toBe("23:45:00");
    });

    it("경계값을 올바르게 처리한다", () => {
      expect(to24HourTime("오전", "12:00")).toBe("00:00:00");
      expect(to24HourTime("오후", "12:00")).toBe("12:00:00");
      expect(to24HourTime("오후", "11:59")).toBe("23:59:00");
    });
  });

  describe("cleanDateString", () => {
    it("월 문자열을 정리한다", () => {
      expect(cleanDateString("1월", "월")).toBe("01");
      expect(cleanDateString("12월", "월")).toBe("12");
      expect(cleanDateString("5월", "월")).toBe("05");
    });

    it("일 문자열을 정리한다", () => {
      expect(cleanDateString("15일", "일")).toBe("15");
      expect(cleanDateString("5일", "일")).toBe("05");
      expect(cleanDateString("31일", "일")).toBe("31");
    });

    it("괄호와 요일 정보를 제거한다", () => {
      expect(cleanDateString("15일 (월)", "일")).toBe("15");
      expect(cleanDateString("5일 (금)", "일")).toBe("05");
      expect(cleanDateString("1월 (1월)", "월")).toBe("01");
    });

    it("다른 접미사도 처리한다", () => {
      expect(cleanDateString("2024년", "년")).toBe("2024");
      expect(cleanDateString("30분", "분")).toBe("30");
    });
  });

  describe("formatFirstDayToDateString", () => {
    it("FirstDay 객체를 날짜와 시간 문자열로 변환한다", () => {
      const firstDay = {
        year: 2024,
        month: "1월",
        day: "15일 (월)",
        period: "오전",
        time: "9:30",
      };

      const result = formatFirstDayToDateString(firstDay);

      expect(result).toEqual({
        formattedDate: "2024-01-15",
        formattedTime: "09:30:00",
      });
    });

    it("오후 시간도 올바르게 변환한다", () => {
      const firstDay = {
        year: 2024,
        month: "12월",
        day: "25일 (수)",
        period: "오후",
        time: "2:15",
      };

      const result = formatFirstDayToDateString(firstDay);

      expect(result).toEqual({
        formattedDate: "2024-12-25",
        formattedTime: "14:15:00",
      });
    });

    it("한 자리 월/일도 올바르게 패딩한다", () => {
      const firstDay = {
        year: 2024,
        month: "5월",
        day: "5일 (월)",
        period: "오전",
        time: "10:00",
      };

      const result = formatFirstDayToDateString(firstDay);

      expect(result).toEqual({
        formattedDate: "2024-05-05",
        formattedTime: "10:00:00",
      });
    });

    it("경계값 시간을 올바르게 처리한다", () => {
      const firstDay = {
        year: 2024,
        month: "6월",
        day: "10일 (월)",
        period: "오전",
        time: "12:00",
      };

      const result = formatFirstDayToDateString(firstDay);

      expect(result).toEqual({
        formattedDate: "2024-06-10",
        formattedTime: "00:00:00",
      });
    });
  });
});
