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
  for (const [key, value] of Object.entries(available)) {
    if (value.length === 0) {
      available[key] = ["불가"];
    }
  }

  const response = await httpService.put<string>(`/teacher/info/available`, {
    name,
    phoneNumber,
    available: [available],
  });

  return response.data;
};
