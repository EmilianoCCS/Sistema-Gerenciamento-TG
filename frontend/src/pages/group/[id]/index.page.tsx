import { useRef, useState } from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import axios from "axios";

import constants from "@/constants";

import { api } from "@/services/apiClient";
import { setupAPIClient } from "@/services/api";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Group } from "@/types";

import { Navbar } from "@/components/common/Navbar";
import { Button } from "@/components/common/Button";

import styles from "./styles.module.css";

type GroupDetailsPageProps = {
  token: string;
  profileType: string;
  group: Group;
}

export default function GroupDetailsPage({ token, group, profileType }: GroupDetailsPageProps) {
  const documentFileInputRef = useRef<HTMLInputElement | null>(null);
  const monographFileInputRef = useRef<HTMLInputElement | null>(null);

  const [documentFilename, setDocumentFilename] = useState<string | null>(group.documentFilename);
  const [documentUrl, setDocumentUrl] = useState<string | null>(group.documentUrl);
  const [monographFilename, setMonographFilename] = useState<string | null>(group.monographFilename);
  const [monographUrl, setMonographUrl] = useState<string | null>(group.monographyUrl);

  const { back } = useRouter();

  const handleDocumentFileDownload = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    try {
      if (!documentFilename || !documentUrl) {
        return;
      }

      const response = await axios.get(documentUrl, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data]);

      // Cria um link temporário e faz o download do arquivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', documentFilename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Libera a URL temporária
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  const handleMonographFileDownload = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    try {
      if (!monographFilename || !monographUrl) {
        return;
      }

      const response = await axios.get(monographUrl, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data]);

      // Cria um link temporário e faz o download do arquivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', monographFilename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Libera a URL temporária
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectDocumentFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    documentFileInputRef.current?.click();
  }

  const handleChangeDocumentFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    try {
      const file = event.target.files && event.target.files[0];

      if (!file) {
        return;
      }

      const formData = new FormData();

      formData.append("id", group.id);
      formData.append("documentFile", file);

      const response = await api.patch("/groups/document", formData);

      const { group: { documentFilename, documentUrl } } = response.data;

      setDocumentFilename(documentFilename);
      setDocumentUrl(documentUrl);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectMonographFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    monographFileInputRef.current?.click();
  }

  const handleChangeMonographFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    try {
      const file = event.target.files && event.target.files[0];

      if (!file) {
        return;
      }

      const formData = new FormData();

      formData.append("id", group.id);
      formData.append("monographFile", file);

      const response = await api.patch("/groups/monograph", formData);

      const { group: { monographFilename, monographyUrl } } = response.data;

      setMonographFilename(monographFilename);
      setMonographUrl(monographyUrl);
    } catch (error) {
      console.log(error);
    }
  }

  const handleTeacherAccept = async (
    id?: string,
  ) => {
    if (!id) {
      return;
    }

    try {
      await api.post(`/groups/teachers/${id}/invite`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      back();
    } catch (error) {
      console.log(error);
    }
  }

  const handleTeacherDecline = async (
    id?: string,
  ) => {
    if (!id) {
      return;
    }

    try {
      await api.post(`/groups/teachers/${id}/decline`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      back();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar pageTitle="/group-details" />
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.heading}>Detalhes do Grupo</h2>
            </div>

            <div className={styles.studentInfos}>
              <span>Identificação dos alunos</span>

              <div className={styles.studentsContainer}>
                {group.students.map((student, index) => (
                  <div key={student.id} className={styles.studentContent}>
                    <p className={styles.studentName}>{index + 1}. {student.user.fullName}</p>
                    <p className={styles.studentEmail}>{student.user.email}</p>
                  </div>
                ))}
                {group.studentInvites.map((invite, index) => (
                  <div key={invite.id} className={styles.studentContent}>
                    <p className={styles.studentName}>{index + 1}. {invite.student.user.fullName} (pendente)</p>
                    <p className={styles.studentEmail}>{invite.student.user.email}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            <div className={styles.cardBody}>
              <h2 className={styles.heading}>Proposta de Trabalho</h2>

              <div className={styles.infoContainer}>
                <h3 className={styles.subtitle}>Tema</h3>
                <p>
                  {group.theme}
                </p>
              </div>

              <div className={styles.infoContainer}>
                <h3 className={styles.subtitle}>Justificativas</h3>
                {group.justifications.map(justification => (
                  <p key={justification.id}>{justification.text}</p>
                ))}
              </div>

              <div className={styles.infoContainer}>
                <h3 className={styles.subtitle}>Resumo - Explicação do Tema</h3>
                <p>
                  {group.summary}
                </p>
              </div>

              <div className={styles.infoContainer}>
                <h3 className={styles.subtitle}>Orientador</h3>
                {group.teachers.map(teacher => (
                  <p key={teacher.id}>
                    {teacher.user.fullName}
                  </p>
                ))}
                {group.teacherInvites.map(invite => (
                  <p key={invite.id}>
                    {invite.teacher.user.fullName} (pendente)
                  </p>
                ))}
              </div>

              <div className={styles.documentContainer}>
                <div className={styles.documentInfo}>
                  <h3 className={styles.subtitle}>Documento de formalização</h3>
                  <div>
                    <input
                      ref={documentFileInputRef}
                      type="file"
                      onChange={handleChangeDocumentFile}
                      hidden
                    />
                    {documentFilename}
                  </div>
                </div>

                <div className={styles.documentActions}>
                  <Button
                    variant="cancel"
                    onClick={handleSelectDocumentFile}
                  >
                    Atualizar
                  </Button>

                  <Button
                    variant="success"
                    onClick={handleDocumentFileDownload}
                  >
                    Baixar
                  </Button>
                </div>
              </div>

              <div className={styles.documentContainer}>
                <div className={styles.documentInfo}>
                  <h3 className={styles.subtitle}>Monografia</h3>
                  <div>
                    <input
                      ref={monographFileInputRef}
                      type="file"
                      onChange={handleChangeMonographFile}
                      hidden
                    />
                    {monographFilename}
                  </div>
                </div>

                <div className={
                  monographFilename
                    ? styles.documentActions
                    : styles.documentButton
                }>
                  <Button
                    variant="cancel"
                    onClick={handleSelectMonographFile}
                  >
                    Atualizar
                  </Button>

                  {monographFilename && (
                    <Button
                      variant="success"
                      onClick={handleMonographFileDownload}
                    >
                      Baixar
                    </Button>
                  )}
                </div>
              </div>

              {(profileType === 'teacher' && group.teacherInvites.find(i => i.groupId === group.id)) && (
                <div className={styles.actionsContainer}>
                  <p className="text-lg font-semibold">
                    Deseja aceitar o grupo?
                  </p>

                  <div className={styles.buttonInvitesActions}>
                    <Button
                      variant='cancel'
                      onClick={() => handleTeacherDecline(group.teacherInvites.find(i => i.groupId === group.id)?.id)}
                    >
                      Recusar
                    </Button>
                    <Button
                      variant='success'
                      onClick={() => handleTeacherAccept(group.teacherInvites.find(i => i.groupId === group.id)?.id)}
                    >
                      Aceitar
                    </Button>
                  </div>
                </div>
              )}
            </div>


          </div>
        </div>
      </main>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = withSSRAuth<GroupDetailsPageProps>(async (ctx) => {
  const { id } = ctx.params as {
    id: string;
  }

  const cookies = parseCookies(ctx);
  const profileType = cookies[constants.USER_PROFILE_TYPE];
  const token = cookies[constants.USER_TOKEN];

  const api = setupAPIClient(ctx);
  const response = await api.get(`/groups/${id}`);

  const { group } = response.data;

  return {
    props: {
      token,
      profileType,
      group
    }
  }
});