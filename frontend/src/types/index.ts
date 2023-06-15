type StudentInvite = {
  id: string;
  student: Student;
}

type Student = {
  id: string;
  user: User;
}

type Justification = {
  id: string;
  text: string;
}

export type Group = {
  id: string;
  theme: string;
  summary: string;
  studentInvites: StudentInvite[];
  students: Student[];
  teacherInvites: TeacherInvite[];
  teachers: Teacher[];
  justifications: Justification[];
  documentFilename: string | null;
  documentUrl: string | null;
  monographFilename: string | null;
  monographyUrl: string | null;
  createdAt: string;
}

export type Invite = {
  id: string;
  group: Group;
}

export type User = {
  id: string;
  fullName: string | null;
  displayName: string | null;
  email: string;
  secondaryEmail: string | null;
  avatarUrl: string | null;
  phone: string | null;
  isWhatsapp: boolean;
  isPhoneVisible: boolean;
  isEmailVerified: boolean;
  isProfileCompleted: boolean;
  createdAt: string;
};

export type Profile = {
  id: string;
  user: User;
  school: School;
  course: Course;
  disciplines: Discipline[];
  invites: Invite[];
  groups: Group[];
};

export type TeacherInvite = {
  id: string;
  teacher: Teacher;
}

export type Teacher = {
  id: string;
  userId: string;
  user: User;
  schoolId: string;
  createdAt: string;
  isActive?: boolean;
  groups: Group[];
}


export type Discipline = {
  id: string;
  name: string;
  createdAt: string;
}

export type Course = {
  id: string;
  name: string;
  disciplines: Discipline[];
  createdAt: string;
}

export type School = {
  id: string;
  name: string;
  courses: Course[];
  createdAt: string;
}