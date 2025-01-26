export interface TeacherProfile {
  id: number;
  nickname: string;
  subject: string[];
  fullName: string;
  isActive: boolean;
  acceptedCount: number;
  totalCount: number;
  school: string;
  region: string[];
  youtubeLink?: string;
  remark?: string;
}
