import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod';
import nookies from 'nookies';

import constants from "@/constants";

import { withSSRGuest } from "@/utils/withSSRGuest";

import { api } from "@/services/apiClient";

import { Navbar } from "@/components/common/Navbar";
import { TextInput } from "@/components/common/TextInput";
import { Button } from "@/components/common/Button";

import styles from "./styles.module.css";

const registerFormSchema = z.object({
  email: z.string()
    .nonempty({ message: 'E-mail obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string()
    .nonempty({ message: 'Senha obrigatória' })
    .min(6, { message: 'Senha deve conter no mínimo 6 caracteres' }),
  confirmPassword: z.string()
    .nonempty({ message: 'Confirmação de senha obrigatória' })
    .min(6, { message: 'Confirmação de senha deve conter no mínimo 6 caracteres' }),
})
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

type RegisterPageProps = {};

export default function RegisterPage() {
  const { pathname, push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema)
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async ({
    email,
    password,
  }) => {
    try {
      const response = await api.post('/users', {
        email,
        password,
      });

      const { token } = response.data;

      nookies.set(null, constants.USER_TOKEN, token, {
        path: '/',
        maxAge: 86400
      });

      push(`/verify?email=${email}`)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSignUp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    await handleSubmit(onSubmit)();
  }

  return (
    <>
      <Navbar pageTitle={pathname} />
      <div className={styles.container}>
        <div className={styles.content}>

          <h2 className={styles.title}>Criar Conta</h2>

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

            <div className={styles.formControl}>
              <label
                htmlFor="confirmPassword"
                className={styles.label}
              >
                Confirmar Senha
              </label>
              <TextInput
                id='confirmPassword'
                type='password'
                isError={!!errors.confirmPassword}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <span className={styles.messageError}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button onClick={handleSignUp}>
              Criar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest<RegisterPageProps>(async (ctx) => {
  return {
    props: {}
  }
});