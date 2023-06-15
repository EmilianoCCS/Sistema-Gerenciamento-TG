import { useState } from 'react';

import { useRouter } from 'next/router';
import nookies, { parseCookies } from 'nookies';

import { Teacher } from '@/types';

import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";

import styles from './styles.module.css';

type CoordinationPanelProps = {
  teachers?: Teacher[];
};

export function CoordinationPanel({ teachers }: CoordinationPanelProps) {
  const { push } = useRouter();

  const handleNavigateToCreateTeacher = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    push('/teacher');
  }

  return (
    <Card>
      <div className='flex flex-col w-full gap-4'>
        <div className={styles.wrapper}>
          <div className={styles.headerContainer}>
            <div className={styles.empty} />
            <div className={styles.header}>
              <h2 className={styles.heading}>
                Professores Ativos
              </h2>
              {!!teachers && (
                <span className={styles.subtitle}>
                  Nenhum professor cadastrado ativo
                </span>
              )}
            </div>
            <div className={styles.empty} >
              {!!teachers && (
                <Button
                  variant='success'
                  onClick={handleNavigateToCreateTeacher}
                >
                  Adicionar
                </Button>
              )}
            </div>
          </div>
          <div className={styles.teachersList}>
            {teachers && teachers
              .map((teacher, index) => (
                <div key={index} className={styles.teacherItem}>
                  <div className={styles.teacherInfo}>
                    <span className={styles.teacherName}>
                      {teacher.user.fullName}
                    </span>
                    <span className={styles.teacherEmail}>
                      {teacher.user.email}
                    </span>
                  </div>
                  <div className={styles.buttonContainer}>
                    <div>
                      <Button
                        variant='success'
                        onClick={() => push(`/teacher/${teacher.id}`)}
                      >
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* <hr className={styles.divider} />

        <div className={styles.wrapper}>
          <div className={styles.headerContainer}>
            <div className={styles.empty} />
            <div className={styles.header}>
              <h2 className={styles.heading}>
                Professores Desativados
              </h2>
              {!!teachers && (
                <span className={styles.subtitle}>
                  Nenhum professor cadastrado desativado
                </span>
              )}
            </div>
            <div className={styles.empty} />
          </div>
        </div> */}
      </div>
    </Card>
  );
}