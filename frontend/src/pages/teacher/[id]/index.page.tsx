import { useState } from "react";

import { GetServerSideProps } from "next";
import { notFound } from "next/navigation";
import nookies, { parseCookies } from "nookies";

import { setupAPIClient } from "@/services/api";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Teacher } from "@/types";

import { Navbar } from "@/components/common/Navbar";
import { ToggleButton } from "@/components/common/ToggleButton";

import styles from "./styles.module.css";
import { api } from "@/services/apiClient";

type TeacherDetailsPageProps = {
  teacher: Teacher;
};

export default function TeacherDetailsPage({ teacher }: TeacherDetailsPageProps) {
  const [teacherUser, setTeacherUser] = useState(teacher);

  const handleToggleActive = async () => {

    if (teacherUser.isActivated) {
      const response = await api.post(`/teachers/${teacherUser.id}/deactivate`);

      const { teacher: updatedTeacher } = response.data;

      setTeacherUser(updatedTeacher);
    } else {
      const response = await api.post(`/teachers/${teacherUser.id}/activate`);

      const { teacher: updatedTeacher } = response.data;

      setTeacherUser(updatedTeacher);
    }
  }

  return (
    <>
      <Navbar pageTitle="/teacher" />
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col gap-1">
                <h2 className={styles.heading}>
                  {teacherUser.user.fullName}
                </h2>
                <span>
                  {teacherUser.user.email}
                </span>
              </div>

              <ToggleButton
                id="check"
                checked={teacherUser.isActivated}
                onChange={handleToggleActive}
              />
            </div>
          </div>
          <div>
            {teacherUser.groups.map(item => (
              <div key={item.id} className={styles.card}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl text-gray-700 font-semibold">
                      {item.theme}
                    </h3>
                    <span className="text-gray-600 font-medium">
                      {item.summary}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl text-gray-700 font-semibold">
                      Integrantes
                    </h3>

                    <div className="flex flex-col gap-1">
                      <span className="text-gray-700 font-medium">
                        Emiliano Callegari
                      </span>
                      <span className="text-gray-600">
                        emiliano.callegari@hotmail.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<TeacherDetailsPageProps>(async (ctx) => {
  const { id } = ctx.params as {
    id: string;
  }

  if (!id) {
    return notFound();
  }

  const api = setupAPIClient(ctx);
  const response = await api.get(`/teachers/${id}`);
  const { teacher } = response.data;

  return {
    props: {
      teacher,
    }
  }
});