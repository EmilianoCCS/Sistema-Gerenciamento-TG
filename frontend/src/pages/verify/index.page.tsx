import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";

import constants from "@/constants";

import { api } from "@/services/apiClient";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Navbar } from "@/components/common/Navbar";
import { Button } from "@/components/common/Button";

import styles from "./styles.module.css";

type VerifyPageProps = {
  email: string;
}

export default function VerifyPage({ email }: VerifyPageProps) {
  const { pathname, push } = useRouter();

  const handleNavigateToLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    nookies.destroy(null, constants.USER_TOKEN);
    nookies.destroy(null, constants.USER_REFRESH_TOKEN);
    nookies.destroy(null, constants.USER_EMAIL);

    push('/login');
  }

  const handleSendVerificationToEmail = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    await api.post(`/verify?email=${email}`);
  }

  return (
    <>
      <Navbar pageTitle={pathname} email={email} />
      <main className={styles.container}>
        <div className={styles.content}>

          <h2 className={styles.title}>
            Para continuar, verifique seu e-mail
          </h2>

          <h3 className={styles.subtitle}>
            {email}
          </h3>

          <h3 className={styles.subtitle}>
            E faça login novamente.
          </h3>

          <br />

          <div className={styles.buttonContainer}>
            <Button onClick={handleNavigateToLogin}>
              Ir para o Login
            </Button>

            <Button onClick={handleSendVerificationToEmail}>
              Reenviar e-mail
            </Button>
          </div>

          <p className={styles.message}>
            Caso não econtre o e-mail de verificação, procure na caixa de spam
          </p>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<VerifyPageProps>(async (ctx) => {
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

  return {
    props: {
      email,
    }
  }
});