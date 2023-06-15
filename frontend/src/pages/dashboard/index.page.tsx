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


  const { pathname, push } = useRouter();

  const handleNavigateToCreateGroup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    push('/group');
  }

  const handleNavigateToSchedule = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    push('/schedule');
  }

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

  const handleTeacherAccept = async (
    id: string,
  ) => {
    try {
      await api.post(`/groups/teachers/${id}/invite`);

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

  const handleTeacherDecline = async (
    id: string,
  ) => {
    try {
      await api.post(`/groups/teachers/${id}/decline`);

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
              onAccept={handleTeacherAccept}
              onDecline={handleTeacherDecline}
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
          {/* <div className={styles.card}>

            <div className="flex flex-1 flex-col justify-center items-center gap-4">
              <div className='flex flex-1 flex-col justify-center items-center gap-2'>
                <h2 className='text-2xl text-gray-700 font-medium'>
                  Seus Grupos
                </h2>
                {!acceptGroup && (
                  <span className='text-md text-gray-700'>
                    Você ainda não está em um grupo
                  </span>
                )}
              </div>
              <div className="flex w-full justify-between items-center border rounded p-4">
                <div className="flex flex-col w-full">
                  <h3 className="text-lg font-semibold">
                    Sistema de Gestão de Trabalho de Graduação
                  </h3>
                  <span className="text-sm text-gray-700">
                    Resumo
                  </span>
                </div>
                <div className="flex gap-2">
                  {acceptGroup && (
                    <>
                      <div>
                        <Button
                          variant='outlineVariant'
                        >
                          Ver
                        </Button>
                      </div>
                      <div>
                        <Button
                          variant='outlineVariant'
                          onClick={handleNavigateToSchedule}
                        >
                          Agendar
                        </Button>
                      </div>
                    </>
                  )}
                  {(!acceptGroup && schedule.length === 0) && (
                    <>
                      <div>
                        <Button
                          variant='outlineVariant'
                          onClick={handleAcceptGroup}
                        >
                          Aceitar
                        </Button>
                      </div>
                      <div>
                        <Button
                          variant='cancel'
                        >
                          Recusar
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {schedule.length > 0 && (
                <div className='flex flex-1 flex-col justify-center items-center gap-2'>
                  <h2 className='text-2xl text-gray-700 font-medium'>
                    Seus agendamentos
                  </h2>
                </div>
              )}

              {schedule.length > 0 && (
                <div className="flex w-full justify-between items-center border rounded p-4">
                  <div className="flex flex-col w-full">
                    <h3 className="text-lg font-semibold">
                      {schedule[0].grupo}
                    </h3>
                    <span className="text-sm text-gray-700">
                      {schedule[0].data}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <Button
                        variant='outlineVariant'
                      >
                        Ver
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant='cancel'
                      >
                        Deletar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div> */}
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
    const teachersResponse = await api.get("/teachers");

    const { teachers } = teachersResponse.data;

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
