import { useState } from "react"

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import nookies, { parseCookies } from "nookies";

import constants from "@/constants";

import { api } from "@/services/apiClient";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { setupAPIClient } from "@/services/api";

import { Group, Invite, Profile, Teacher } from "@/types";

import { Navbar } from "@/components/common/Navbar";
import { Button } from "@/components/common/Button";
import { CoordinationPanel } from "@/components/dashboard/common/CoordinationPanel";
import { TeacherPanel } from "@/components/dashboard/common/TeacherPanel";
import { StudentPanel } from "@/components/dashboard/common/StudentPanel";

import styles from './styles.module.css';

type DashboardPageProps = {
  email: string,
  profileType: string,
  profile: Profile;
  teachers?: Teacher[];
};

export default function DashboardPage({
  email,
  profileType,
  profile,
  teachers,
}: DashboardPageProps) {
  const [groups, setGroups] = useState<Group[]>(profile.groups);
  const [invites, setInvites] = useState<Invite[]>(profile.invites);

  const [teachersList, setTeachersList] = useState<Teacher[] | undefined>(teachers);

  const { pathname } = useRouter();

  const handleStudentAccept = async (
    id: string,
  ) => {
    try {
      await api.post(`/groups/students/${id}/invite`);

      const cookies = parseCookies();
      const token = cookies[constants.USER_TOKEN];

      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { profile: { groups: groupStudents, invites: groupInvites } } = response.data;

      setGroups(groupStudents);
      setInvites(groupInvites);

    } catch (error) {
      console.log(error);
    }
  }

  const handleStudentDecline = async (
    id: string,
  ) => {
    try {
      await api.post(`/groups/students/${id}/decline`);

      const cookies = parseCookies();
      const token = cookies[constants.USER_TOKEN];

      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { profile: { groups: groupStudents, invites: groupInvites } } = response.data;

      setGroups(groupStudents);
      setInvites(groupInvites);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar
        pageTitle={pathname}
        email={email}
      />
      <main className={styles.container}>
        <div className={styles.content}>
          {profileType === 'coordinator' && (
            <CoordinationPanel
              teachers={teachersList}
            />
          )}
          {profileType === 'teacher' && (
            <TeacherPanel
              groups={groups}
              invites={invites}
            />
          )}
          {profileType === 'student' && (
            <StudentPanel
              group={groups[0]}
              invites={invites}
              onAccept={handleStudentAccept}
              onDecline={handleStudentDecline}
            />
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<DashboardPageProps>(async (ctx) => {
  const cookies = parseCookies(ctx);
  const email = cookies[constants.USER_EMAIL];

  const api = setupAPIClient(ctx);

  const response = await api.get("/profile");

  const {
    profileType,
    profile,
  } = response.data;

  if (!profileType || !profile) {
    return {
      redirect: {
        destination: `/verify?email=claudiolibanez@gmail.com`,
        permanent: false,
      }
    }
  }

  nookies.set(undefined, constants.USER_PROFILE_TYPE, profileType);
  nookies.set(undefined, constants.USER_PROFILE, JSON.stringify(profile));

  if (profileType === "coordinator") {
    const [enabledTeachersResponse, disabledTeachersResponse] = await Promise.all([
      api.get("/teachers?isActivated=true"),
      api.get("/teachers?isActivated=false"),
    ])

    const { teachers: enabledTeachers } = enabledTeachersResponse.data;
    const { teachers: disabledTeachers } = disabledTeachersResponse.data;

    let teachers: Teacher[] = [];

    teachers = [
      ...enabledTeachers,
      ...disabledTeachers,
    ];

    return {
      props: {
        email,
        profileType,
        profile,
        teachers,
      }
    }
  }

  return {
    props: {
      email,
      profileType,
      profile,
    }
  }
});
