import { GetServerSideProps } from "next";

import { setupAPIClient } from "@/services/api";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Navbar } from "@/components/common/Navbar";

import styles from './styles.module.css';

type ConfirmPageProps = {}

export default function ConfirmPage() {


  return (
    <>
      <Navbar pageTitle="/confirm" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Confirmação de cadastro realizada com sucesso!
          </h2>

          <p className={styles.description}>
            Agora você já pode acessar a plataforma.
          </p>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<ConfirmPageProps>(async (ctx) => {


  const api = setupAPIClient(ctx);

  const { email, token } = ctx.query as {
    email: string,
    token: string
  };

  await api.post(`/confirm?email=${email}&token=${token}`);

  return {
    props: {}
  }
});