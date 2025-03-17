import { httpService } from "@/utils/httpService";

export const putTeacherAvaiable = async ({
  name,
  phoneNumber,
  available,
}: {
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

  const response = await httpService.put<string>(`/teacher/info/available`, {
    name,
    phoneNumber,
    available: newPostTimes,
  });

  return response.data;
};
