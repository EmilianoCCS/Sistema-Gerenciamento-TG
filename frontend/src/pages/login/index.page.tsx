import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod';
import nookies from 'nookies';

import constants from "@/constants";

import { api } from "@/services/apiClient";

import { withSSRGuest } from "@/utils/withSSRGuest";

import { Navbar } from "@/components/common/Navbar";
import { TextInput } from "@/components/common/TextInput";
import { Button } from "@/components/common/Button";

import styles from "./styles.module.css";

const loginFormSchema = z.object({
  email: z.string()
    .nonempty({ message: 'E-mail obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string()
    .nonempty({ message: 'Senha obrigatória' })
    .min(6, { message: 'Senha deve conter no mínimo 6 caracteres' }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

type LoginPageProps = {};

export default function LoginPage(props: LoginPageProps) {
  const { pathname, push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    email,
    password
  }) => {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { user, profileType, profile, token, refreshToken } = response.data;

      nookies.set(null, constants.USER_EMAIL, email, {
        path: '/',
        maxAge: 86400
      });

      nookies.set(null, constants.USER_TOKEN, token, {
        path: '/',
        maxAge: 86400
      });

      nookies.set(null, constants.USER_REFRESH_TOKEN, refreshToken, {
        path: '/',
        maxAge: 86400
      });

      if (!user.isEmailVerified && !user.isProfileCompleted) {
        push(`/verify?email=${user.email}`);
      } else if (user.isEmailVerified && !user.isProfileCompleted) {
        push(`/student?email=${user.email}`);
      } else {
        nookies.set(null, constants.USER_PROFILE_TYPE, profileType, {
          path: '/',
          maxAge: 86400
        });

        nookies.set(null, constants.USER_PROFILE, JSON.stringify(profile), {
          path: '/',
          maxAge: 86400
        });

        push('/dashboard');
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    await handleSubmit(onSubmit)();
  }

  return (
    <>
      <Navbar pageTitle={pathname} />
      <main className={styles.container}>
        <div className={styles.content}>

          <h2 className={styles.title}>Entrar</h2>

          <div className={styles.form}>
            <div className={styles.formControl}>
              <label
                htmlFor="email"
                className={styles.label}
              >
                E-mail institucional
              </label>
              <TextInput
                id='email'
                type='email'
                isError={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <span className={styles.messageError}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="password"
                className={styles.label}
              >
                Senha
              </label>
              <TextInput
                id='password'
                type='password'
                isError={!!errors.password}
                {...register('password')}
              />
              {errors.password && (
                <span className={styles.messageError}>
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button onClick={handleLogin}>
              Entrar
            </Button>
          </div>

          <p className={styles.registerText}>Não possui cadastro? <Link href="/register" className={styles.linkRegisterText}>Clique aqui para cadastrar.</Link></p>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest<LoginPageProps>(async (ctx) => {
  return {
    props: {}
  }
});