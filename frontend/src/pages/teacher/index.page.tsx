import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod';
import nookies, { parseCookies } from "nookies";

import { setupAPIClient } from "@/services/api";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { School } from "@/types";

import { Navbar } from "@/components/common/Navbar";
import { TextInput } from "@/components/common/TextInput";
import { Button } from "@/components/common/Button";
import { Select } from "@/components/common/Select";

import styles from './styles.module.css';
import { api } from "@/services/apiClient";

const registerTeacherFormSchema = z.object({
  fullName: z.string()
    .nonempty({ message: 'Nome completo obrigatório' }),
  displayName: z.string()
    .nonempty({ message: 'Nome de exibição obrigatório' }),
  email: z.string()
    .nonempty({ message: 'E-mail obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string()
    .nonempty({ message: 'Senha obrigatória' })
    .min(6, { message: 'Senha deve conter no mínimo 6 caracteres' }),
  schoolId: z.string()
    .nonempty('Selecione uma unidade de ensino'),
});

type RegisterTeacherFormData = z.infer<typeof registerTeacherFormSchema>;

type TeacherPageProps = {
  schools: School[];
}

export default function TeacherPage({ schools }: TeacherPageProps) {
  const { pathname, back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterTeacherFormData>({
    resolver: zodResolver(registerTeacherFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterTeacherFormData> = async ({
    fullName,
    displayName,
    email,
    password,
    schoolId,
  }) => {

    await api.post("/users", {
      email,
      password,
    });

    await api.post("/teachers", {
      fullName,
      email,
      displayName,
      schoolId
    });

    back();
  }

  const handleCreateTeacherSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    await handleSubmit(onSubmit)();
  }

  return (
    <>
      <Navbar pageTitle={pathname} />
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>
                Cadastrar Professor
              </h2>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.formControl}>
                <label
                  htmlFor="fullName"
                  className={styles.label}
                >
                  Nome completo*
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
                  Nome de exibição*
                </label>
                <TextInput
                  id="displayName"
                  type='text'
                  {...register('displayName')}
                />
                {errors.displayName && (
                  <small className={styles.messageError}>
                    {errors.displayName?.message}
                  </small>
                )}
              </div>

              <div className={styles.formControl}>
                <label
                  htmlFor="email"
                  className={styles.label}
                >
                  E-mail*
                </label>
                <TextInput
                  id="email"
                  type='email'
                  {...register('email')}
                />
                {errors.email && (
                  <small className={styles.messageError}>
                    {errors.email?.message}
                  </small>
                )}
              </div>

              <div className={styles.formControl}>
                <label
                  htmlFor="email"
                  className={styles.label}
                >
                  Senha*
                </label>
                <TextInput
                  id="password"
                  type='password'
                  {...register('password')}
                />
                {errors.password && (
                  <small className={styles.messageError}>
                    {errors.password?.message}
                  </small>
                )}
              </div>

              <div className={styles.formControl}>
                <label
                  htmlFor="schoolId"
                  className={styles.label}
                >
                  Unidade de Ensino*
                </label>
                <Select
                  id="schoolId"
                  {...register('schoolId', { required: true })}
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

              <hr className={styles.divider} />

              <Button
                onClick={handleCreateTeacherSubmit}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = withSSRAuth<TeacherPageProps>(async (ctx) => {
  const api = setupAPIClient(ctx);

  const response = await api.get('/schools');

  const { schools } = response.data;

  return {
    props: {
      schools,
    }
  }
});