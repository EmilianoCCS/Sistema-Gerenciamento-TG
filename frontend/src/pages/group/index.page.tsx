import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod';
import { parseCookies } from "nookies";

import styles from "./styles.module.css";

import constants from "@/constants";

import { api } from "@/services/apiClient";
import { setupAPIClient } from "@/services/api";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Profile, Teacher } from "@/types";

import { Button } from "@/components/common/Button";
import { Navbar } from "@/components/common/Navbar";
import { Select } from "@/components/common/Select";
import { TextInput } from "@/components/common/TextInput";
import { Checkbox } from "@/components/common/Checkbox";

const registerGroupFormSchema = z.object({
  emailStudent1: z.string(),
  emailStudent2: z.string(),
  emailStudent3: z.string(),
  emailStudent4: z.string(),
  theme: z.string()
    .nonempty({ message: 'Tema obrigatório' }),
  justification1: z.string()
    .nonempty({ message: 'Justificativa obrigatória' }),
  justification2: z.string(),
  justification3: z.string(),
  justification4: z.string(),
  justification5: z.string(),
  summary: z.string()
    .nonempty({ message: 'Resumo obrigatório' }),
  documentFile: z.any()
    .refine((files) => files?.length == 1, {
      message: 'Documento obrigatório'
    }),
  monographFile: z.any()
    .refine((files) => files?.length == 1, {
      message: 'Documento obrigatório'
    }),
  teacherId: z.string()
    .nonempty({ message: 'Orientador obrigatório' }),
});

type RegisterGroupFormData = z.infer<typeof registerGroupFormSchema>;

type GroupPageProps = {
  profile: Profile;
  teachers: Teacher[];
};

export default function GroupPage({ profile, teachers }: GroupPageProps) {
  const [acceptTerm, setAcceptTerm] = useState(false);
  const { pathname, back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterGroupFormData>({
    resolver: zodResolver(registerGroupFormSchema),
    defaultValues: {
      emailStudent1: profile.user.email,
    }
  });

  const onSubmit: SubmitHandler<RegisterGroupFormData> = async ({
    emailStudent2,
    emailStudent3,
    emailStudent4,
    theme,
    justification1,
    justification2,
    justification3,
    justification4,
    justification5,
    summary,
    documentFile,
    monographFile,
    teacherId
  }) => {
    try {
      const formData = new FormData();

      const emails: string[] = [];
      const justifications: string[] = [];

      if (emailStudent2 && emailStudent2 !== "") {
        emails.push(emailStudent2);
      }

      if (emailStudent3 && emailStudent3 !== "") {
        emails.push(emailStudent3);
      }

      if (emailStudent4 && emailStudent4 !== "") {
        emails.push(emailStudent4);
      }

      if (justification1 && justification1 !== "") {
        justifications.push(justification1);
      }

      if (justification2 && justification2 !== "") {
        justifications.push(justification2);
      }

      if (justification3 && justification3 !== "") {
        justifications.push(justification3);
      }

      if (justification4 && justification4 !== "") {
        justifications.push(justification4);
      }

      if (justification5 && justification5 !== "") {
        justifications.push(justification5);
      }

      formData.append("emails", JSON.stringify(emails));
      formData.append("theme", theme);
      formData.append("justifications", JSON.stringify(justifications));
      formData.append("summary", summary);
      formData.append("documentFile", documentFile[0]);
      formData.append("monographFile", monographFile[0]);
      formData.append("teacherId", JSON.stringify(teacherId));

      const cookies = parseCookies();
      const token = cookies[constants.USER_TOKEN];

      await api.post("/groups", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      back();
    } catch (error) {
      console.log(error);
    }
  }

  const handleRegisterGroupSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    await handleSubmit(onSubmit)();
  }

  const handleAcceptTerm = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = event.target;

    setAcceptTerm(checked);
  }

  return (
    <>
      <Navbar pageTitle={pathname} />
      <main className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.heading}>Crie seu Grupo</h2>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.subtitle}>Alunos</h3>

            <div className={styles.formControl}>
              <label
                htmlFor="emailStudent1"
                className={styles.label}
              >
                E-mail aluno 1
              </label>
              <TextInput
                id="emailStudent1"
                type='text'
                {...register('emailStudent1')}
                disabled
              />
              {errors.emailStudent1 && (
                <small className={styles.messageError}>
                  {errors.emailStudent1?.message}
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="emailStudent2"
                className={styles.label}
              >
                E-mail aluno 2
              </label>
              <TextInput
                id="emailStudent2"
                type='text'
                placeholder="Opcional"
                {...register('emailStudent2')}
              />
              {errors.emailStudent2 ? (
                <small className={styles.messageError}>
                  {errors.emailStudent2?.message}
                </small>
              ) : (
                <small className={styles.messageHelper}>
                  Preencha o e-mail institucional dos integrantes do seu grupo
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="emailStudent3"
                className={styles.label}
              >
                E-mail aluno 3
              </label>
              <TextInput
                id="emailStudent3"
                type='text'
                placeholder="Opcional"
                {...register('emailStudent3')}
              />
              {errors.emailStudent3 ? (
                <small className={styles.messageError}>
                  {errors.emailStudent3?.message}
                </small>
              ) : (
                <small className={styles.messageHelper}>
                  Preencha o e-mail institucional dos integrantes do seu grupo
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="emailStudent4"
                className={styles.label}
              >
                E-mail aluno 4
              </label>
              <TextInput
                id="emailStudent4"
                type='text'
                placeholder="Opcional"
                {...register('emailStudent4')}
              />
              {errors.emailStudent4 ? (
                <small className={styles.messageError}>
                  {errors.emailStudent4?.message}
                </small>
              ) : (
                <small className={styles.messageHelper}>
                  Preencha o e-mail institucional dos integrantes do seu grupo
                </small>
              )}
            </div>

            <hr className={styles.divider} />

            <h3 className={styles.subtitle}>Trabalho</h3>

            <div className={styles.formControl}>
              <label
                htmlFor="theme"
                className={styles.label}
              >
                Tema*
              </label>
              <TextInput
                id="theme"
                type='text'
                {...register('theme')}
              />
              {errors.theme && (
                <small className={styles.messageError}>
                  {errors.theme?.message}
                </small>
              )}
            </div>

            <h3 className={styles.subtitle}>Justificativas</h3>

            <div className={styles.formControl}>
              <TextInput
                id="justification1"
                type='text'
                placeholder="1: Obrigatória"
                {...register('justification1')}
              />
              {errors.justification1 && (
                <small className={styles.messageError}>
                  {errors.justification1?.message}
                </small>
              )}
            </div>
            <div className={styles.formControl}>
              <TextInput
                id="justification2"
                type='text'
                placeholder="2: Obrigatória"
                {...register('justification2')}
              />
              {errors.justification2 && (
                <small className={styles.messageError}>
                  {errors.justification2?.message}
                </small>
              )}
            </div>
            <div className={styles.formControl}>
              <TextInput
                id="justification3"
                type='text'
                placeholder="3: Obrigatória"
                {...register('justification3')}
              />
              {errors.justification3 && (
                <small className={styles.messageError}>
                  {errors.justification3?.message}
                </small>
              )}
            </div>
            <div className={styles.formControl}>
              <TextInput
                id="justification4"
                type='text'
                placeholder="4: Opcional"
                {...register('justification4')}
              />
              {errors.justification4 && (
                <small className={styles.messageError}>
                  {errors.justification4?.message}
                </small>
              )}
            </div>
            <div className={styles.formControl}>
              <TextInput
                id="justification5"
                type='text'
                placeholder="5: Opcional"
                {...register('justification5')}
              />
              {errors.justification5 && (
                <small className={styles.messageError}>
                  {errors.justification5?.message}
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="summary"
              >
                Resumo - Explicação do Thema (150 a 300 caracteres) {0}
              </label>
              <textarea
                id="summary"
                className={styles.textArea}
                placeholder="Descrição/Resumo"
                {...register('summary')}
              />
            </div>

            <div className={styles.inputFileContainer}>
              <label
                htmlFor="documentFile"
                className={styles.subtitle}
              >
                Documento do grupo
              </label>
              <input
                id="documentFile"
                type="file"
                className={styles.inputFile}
                {...register('documentFile')}
              />
              {errors.documentFile && (
                <small className={styles.messageError}>
                  {errors.documentFile?.message?.toString()}
                </small>
              )}
            </div>

            <div className={styles.inputFileContainer}>
              <label
                htmlFor="monographFile"
                className={styles.subtitle}
              >
                Monografia
              </label>
              <input
                id="monographFile"
                type="file"
                className={styles.inputFile}
                {...register('monographFile')}
              />
              {errors.monographFile && (
                <small className={styles.messageError}>
                  {errors.monographFile?.message?.toString()}
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="teacherId"
                className={styles.subtitle}
              >
                Orientador
              </label>
              <Select
                id="teacherId"
                {...register('teacherId')}
              >
                <option value="">Selecione...</option>
                {teachers.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.user.fullName}
                  </option>
                ))}
              </Select>
              {errors.teacherId && (
                <small className={styles.messageError}>
                  {errors.teacherId?.message}
                </small>
              )}
            </div>

            <div className={styles.infoContainer}>
              <Checkbox
                id="aceite"
                checked={acceptTerm}
                onChange={handleAcceptTerm}
                label="Declaro estar ciente e concordar com as regras estabelecidas pela coordenação do Curso Superior de Tecnologia."
              />
            </div>
            <Button
              disabled={!acceptTerm}
              onClick={handleRegisterGroupSubmit}
            >
              Criar Grupo
            </Button>
          </div>
        </div>
      </main >
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<GroupPageProps>(async (ctx) => {
  const api = setupAPIClient(ctx);
  const [profileResponse, teacherResponse] = await Promise.all([
    api.get("/profile"),
    api.get("/teachers")
  ]);

  const {
    profile,
  } = profileResponse.data;

  const {
    teachers
  } = teacherResponse.data;

  return {
    props: {
      profile,
      teachers,
    }
  }
});