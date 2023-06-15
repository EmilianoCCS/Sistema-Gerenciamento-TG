import { useState } from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import nookies from 'nookies';

import constants from "@/constants";

import { School } from "@/types";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { api } from "@/services/apiClient";
import { setupAPIClient } from "@/services/api";

import { Navbar } from "@/components/common/Navbar";
import { TextInput } from "@/components/common/TextInput";
import { Select } from "@/components/common/Select";
import { Checkbox } from "@/components/common/Checkbox";
import { Button } from "@/components/common/Button";

import styles from './styles.module.css';

const studentSchema = z.object({
  fullName: z.string()
    .nonempty('Informe seu nome completo'),
  displayName: z.string()
    .nonempty('Informe seu username'),
  secondaryEmail: z.string(),
  schoolId: z.string()
    .nonempty('Selecione uma unidade de ensino'),
  courseId: z.string()
    .nonempty('Selecione um curso'),
  disciplineId: z.string()
    .nonempty('Selecione uma disciplina'),
  phone: z.string(),
  isWhatsapp: z.boolean(),
  isPhoneVisible: z.boolean(),
});

type StudentFormData = z.infer<typeof studentSchema>;

type StudentPageProps = {
  email: string;
  schools: School[];
}

export default function StudentPage({ email, schools }: StudentPageProps) {
  const [schoolId, setSchoolId] = useState('');
  const [courseId, setCourseId] = useState('');

  const [acceptTerm, setUserAcceptTerm] = useState(false);

  const { pathname, push } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit: SubmitHandler<StudentFormData> = async ({
    fullName,
    displayName,
    secondaryEmail,
    schoolId,
    courseId,
    disciplineId,
    phone,
    isPhoneVisible,
    isWhatsapp,
  }) => {
    try {
      const disciplineIds: string[] = [];

      disciplineIds.push(disciplineId);

      await api.post('/students', {
        fullName,
        displayName,
        email,
        secondaryEmail,
        schoolId,
        courseId,
        disciplineIds,
        phone,
        isPhoneVisible,
        isWhatsapp,
      });

      push('/dashboard');

    } catch (error) {
      console.log(error);
    }
  }

  const handleTeachingUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    setSchoolId(value);
  }

  const handleCourseChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    setCourseId(value);
  }

  const handleRegisterStudentSubmit = async () => await handleSubmit(onSubmit)();

  const handleUserAcceptTerm = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = event.target;

    setUserAcceptTerm(checked);
  }

  return (
    <>
      <Navbar pageTitle={pathname} email={email} />
      <main className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.title}>
              Complete seu Cadastro
            </h2>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.formControl}>
              <label
                htmlFor="fullName"
                className={styles.label}
              >
                Nome completo
              </label>
              <TextInput
                id="fullName"
                type='text'
                {...register('fullName')}
              />
              {errors.fullName && (
                <small className={styles.messageError}>
                  {errors.fullName?.message}
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="displayName"
                className={styles.label}
              >
                Username
              </label>
              <TextInput
                id="displayName"
                type='text'
                iconLeft={<span className={styles.iconText}>@</span>}
                {...register('displayName')}
              />
              {errors.displayName ? (
                <small className={styles.messageError}>
                  {errors.displayName?.message!}
                </small>
              ) : (
                <small className={styles.messageHelper}>
                  Esse é o nome que será exibido para outros participantes
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="email"
                className={styles.label}
              >
                E-mail institucional
              </label>
              <TextInput
                id="email"
                type='email'
                placeholder='nome@examplo.com'
                defaultValue={email}
                disabled
              />
            </div>

            <div className={styles.formControl}>
              <div className={styles.labelContainer}>
                <label
                  htmlFor="secondaryEmail"
                  className={styles.label}
                >
                  E-mail Secundário
                </label>
                <span
                  className={styles.labelHelper}
                >
                  (Opcional)
                </span>
              </div>
              <TextInput
                id="secondaryEmail"
                type='email'
                placeholder='nome@examplo.com'
                {...register('secondaryEmail')}
              />
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="schoolId"
                className={styles.label}
              >
                Unidade de Ensino
              </label>
              <Select
                id="schoolId"
                {...register('schoolId', { required: true })}
                value={schoolId}
                onChange={handleTeachingUnitChange}
              >
                <option value="">Selecione...</option>
                {schools.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.schoolId && (
                <small className={styles.messageError}>
                  {errors.schoolId?.message}
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="courseId"
                className={styles.label}
              >
                Curso
              </label>
              <Select
                id="courseId"
                {...register('courseId')}
                value={courseId}
                onChange={handleCourseChange}
              >
                <option value="">Selecione...</option>
                {schools.find((item) => item.id === schoolId)?.courses.map((subitem) => (
                  <option
                    key={subitem.id}
                    value={subitem.id}
                  >
                    {subitem.name}
                  </option>
                ))}
              </Select>
              {errors.courseId && (
                <small className={styles.messageError}>
                  {errors.courseId?.message}
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="disciplineId"
                className={styles.label}
              >
                Disciplina
              </label>
              <Select
                id="disciplineId"
                {...register('disciplineId')}
              >
                <option value="">Selecione...</option>
                {schools
                  .find((item) => item.id === schoolId)?.courses.find((subitem) => subitem.id === courseId)?.disciplines.map((discipline) => (
                    <option
                      key={discipline.id}
                      value={discipline.id}
                    >
                      {discipline.name}
                    </option>
                  ))}
              </Select>
              {errors.disciplineId && (
                <small className={styles.messageError}>
                  {errors.disciplineId?.message}
                </small>
              )}
            </div>

            <div className={styles.formPart}>
              <div className={styles.formControl}>
                <div className={styles.labelContainer}>
                  <label
                    htmlFor="phone"
                    className={styles.label}
                  >
                    Celular
                  </label>
                  <span
                    className={styles.labelHelper}
                  >
                    (Opcional)
                  </span>
                </div>
                <TextInput
                  id="phone"
                  type='text'
                  placeholder='(xx) x xxxx-xxxx'
                  {...register('phone')}
                />
              </div>

              <div className={styles.infoContainer}>
                <p className={styles.messageInfo}>
                  O seu número de celular não será exíbido de forma pública, apenas para o seu grupo de trabalhos, caso permita.
                </p>
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <Checkbox
                id="whatsapp"
                {...register('isWhatsapp')}
                label="Este celular é whatsapp."
              />

              <Checkbox
                id="phoneVisible"
                {...register('isPhoneVisible')}
                label="Quero que meu celular fique visível para o meu grupo de trabalho."
              />
            </div>

            <hr className={styles.divider} />

            <Checkbox
              id="acceptTerm"
              checked={acceptTerm}
              onChange={handleUserAcceptTerm}
              label="Estou ciente e permito que estes dados sejam armazenados e compartilhados com a minha instituição de ensino."
            />

            <hr className={styles.divider} />

            <Button
              disabled={!acceptTerm}
              onClick={handleRegisterStudentSubmit}
            >
              Completar o Cadastro
            </Button>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerText}>&copy; 2022 SGTG</p>
      </footer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<StudentPageProps>(async (ctx) => {
  const { email } = ctx.query as {
    email?: string;
  }

  if (!email) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const api = setupAPIClient(ctx);

  const response = await api.get('/schools');

  const { schools } = response.data;

  return {
    props: {
      email,
      schools,
    }
  }
});