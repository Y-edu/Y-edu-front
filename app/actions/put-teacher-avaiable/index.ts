import { httpService } from "@/utils/httpService";

export const putTeacherAvaiable = async ({
  name,
  phoneNumber,
  available,
}: {
  name: string;
  phoneNumber: string;
  available: string[];
}) => {
  const response = await httpService.put<string>(`/teacher/info/available`, {
    name,
    phoneNumber,
    available,
  });

  return response.data;
};
