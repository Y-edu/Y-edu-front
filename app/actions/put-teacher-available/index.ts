import { httpService } from "@/utils/httpService";

export const putTeacherAvailable = async ({
  name,
  phoneNumber,
  available,
  token,
}: {
  token?: string;
  name: string;
  phoneNumber: string;
  available: Record<string, string[]>;
}) => {
  const newPostTimes = [];
  for (const [, value] of Object.entries(available)) {
    if (value.length === 0) {
      newPostTimes.push(["불가"]);
    } else {
      newPostTimes.push(value.map((time) => time.substring(0, 5)));
    }
  }
  if (token) {
    const { data } = await httpService.put<string>(
      `/teacher/token/info/available`,
      {
        token,
        dayTimes: newPostTimes,
      },
    );
    return data;
  }

  const response = await httpService.put<string>(`/teacher/info/available`, {
    name,
    phoneNumber,
    available: newPostTimes,
  });

  return response.data;
};

export const putTeacherAvailableToken = async (
  token: string,
  available: Record<string, string[]>,
) => {
  const dayTimes = Object.entries(available).map(([day, times]) => ({
    day,
    times: times.map((t) => t.slice(0, 5)),
  }));

  const { data } = await httpService.put<string>(
    `/teacher/token/info/available`,
    {
      token,
      dayTimes,
    },
  );
  return data;
};
