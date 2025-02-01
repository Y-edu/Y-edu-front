import data from "../../data/teacherProfile.json";
import ProfileImageName from "./ProfileImageName";
import PersonImg from "../../../public/images/person-img.png";

export default function ProfileTop() {
  return (
    <div className="flex w-full justify-center py-[42px]">
      <ProfileImageName
        imgSrc={PersonImg}
        name={`${data.data.nickName} 선생님`}
      />
    </div>
  );
}
