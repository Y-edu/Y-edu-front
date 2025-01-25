import { http, HttpResponse } from "msw";

import { TeacherProfile } from "../app/types/TeacherProfile";

const baseProfiles: TeacherProfile[] = [
  {
    id: 1,
    nickname: "제이크",
    subject: ["영어"],
    fullName: "김한수",
    isActive: true,
    acceptedCount: 10,
    totalCount: 15,
    school: "서울대학교/경영학과",
    region: ["강남"],
    youtubeLink: "",
    remark: "열정적인 선생님",
  },
  {
    id: 2,
    nickname: "엘리시아",
    subject: ["수학"],
    fullName: "이선경",
    isActive: false,
    acceptedCount: 20,
    totalCount: 40,
    school: "연세대학교/컴퓨터공학과",
    region: ["강북", "마포"],
    youtubeLink: "",
    remark: "학생들에게 인기 많은 선생님",
  },
  {
    id: 3,
    nickname: "마이크",
    subject: ["영어", "수학"],
    fullName: "성이름",
    isActive: true,
    acceptedCount: 5,
    totalCount: 50,
    school: "고려대학교/영문학과",
    region: ["서대문"],
    youtubeLink: "",
    remark: "경험이 풍부한 베테랑 선생님",
  },
  {
    id: 4,
    nickname: "새라",
    subject: ["영어"],
    fullName: "임은정",
    isActive: true,
    acceptedCount: 25,
    totalCount: 30,
    school: "한양대학교/수학과",
    region: ["강동"],
    youtubeLink: "",
    remark: "친절하고 이해심 많은 선생님",
  },
  {
    id: 5,
    nickname: "크리스틴",
    subject: ["수학"],
    fullName: "이민수",
    isActive: false,
    acceptedCount: 15,
    totalCount: 15,
    school: "서강대학교/물리학과",
    region: ["강서"],
    youtubeLink: "",
    remark: "수업이 재미있는 선생님",
  },
];

let teacherProfiles: TeacherProfile[] = [];
for (let i = 0; i < 3; i++) {
  baseProfiles.forEach((base) => {
    teacherProfiles.push({
      ...base,
      id: base.id + i * 5,
    });
  });
}

export const teacherListHandlers: ReturnType<
  typeof http.get | typeof http.put | typeof http.patch
>[] = [
  http.get("http://localhost:3000/api/teachers", () => {
    return HttpResponse.json(teacherProfiles);
  }),

  http.patch(
    "http://localhost:3000/api/teachers/:id",
    async ({ request, params }) => {
      const { id } = params;
      const patchData = await request.json();

      teacherProfiles = teacherProfiles.map((teacher) =>
        teacher.id === Number(id) ? patchData : teacher,
      ) as TeacherProfile[];

      return HttpResponse.json({ message: "수정 성공", data: patchData });
    },
  ),
];
