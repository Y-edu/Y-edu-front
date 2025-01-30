import IconTitleChip from "../../../../components/teacher/IconTitleChip";
import ProfileInfoBox from "../../../../components/teacher/ProfileInfoBox";
import {
  TEACHER_STYLE_ICON,
  TEACHER_STYLE_TEXT,
} from "../../../../constants/teacherStyle";

export default function TeacherPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <ProfileInfoBox
        title="예시 텍스트입니다."
        content={
          <div>
            예시텍스트입니다. 예시텍스트입니다. 예시텍스트입니다.
            예시텍스트입니다. 예시텍스트입니다. 예시텍스트입니다.
            예시텍스트입니다. 예시텍스트입니다. 예시텍스트입니다.
          </div>
        }
      />
      <IconTitleChip
        title={`${TEACHER_STYLE_TEXT.passionate} 선생님`}
        icon={TEACHER_STYLE_ICON.passionate}
      />
    </div>
  );
}
