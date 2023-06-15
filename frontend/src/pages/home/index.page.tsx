import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { withSSRGuest } from "@/utils/withSSRGuest";

import { Carousel } from "@/components/home/common/Carousel";
import { Navbar } from "@/components/common/Navbar";

import styles from "./styles.module.css";

const slides = [
  {
    type: 'text',
    content: 'Na Fatec Mogi Mirim, antes do término do seu curso, os discentes devem elaborar uma atividade científica obrigatória prevista no projeto pedagógico denominada Trabalho de Graduação (TG), a qual trata-se de uma síntese criativa utilizando elementos da sua área de formação.',
  },
  {
    type: 'text',
    content: 'As tarefas de gerenciamento dos grupos de alunos, seus orientadores e a escolha da banca que irá avaliar seus respectivos trabalhos, são feitos de forma manual pelo coordenador de TG e o auxiliar docente fica incumbido de passar e-mails informativos aos alunos sobre datas e confirmações de orientação, impressão de atas, entre outras tarefas.'
  },
  {
    type: 'text',
    content: 'Por meio do SGTG, será possível o gerenciamento das atividades relacionadas ao TG, como a criação de grupos de alunos e orientadores, agendamento de defesa, publicação de documentos e gerenciamento do status de cada estudante.',
  },
  {
    type: 'image',
    content: require('../../assets/images/Diagrama.png'),
  }
];

type HomePageProps = {};

export default function HomePage(props: HomePageProps) {
  const { pathname } = useRouter();

  return (
    <>
      <Navbar pageTitle={pathname} />
      <main className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Sistema de Gerenciamento de Trabalhos de Graduação
          </h2>
          <small className={styles.subtitle}>
            SGTG
          </small>
        </div>

        <div className={styles.carouselContainer}>
          <Carousel slides={slides} />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest<HomePageProps>(async (ctx) => {
  return {
    props: {}
  }
});