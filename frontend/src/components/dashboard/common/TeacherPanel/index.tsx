import { useRouter } from 'next/navigation';

import { Group, Invite } from '@/types';

import { Card } from "@/components/common/Card";
import { Button } from '@/components/common/Button';

import styles from './styles.module.css';
import { formatLongDate } from '@/utils/format-long-date';

type TeacherPanelProps = {
  groups: Group[];
  invites: Invite[];
};

export function TeacherPanel({ groups, invites }: TeacherPanelProps) {
  const { push } = useRouter();

  const handleNavigateToSchedule = (
    id: string
  ) => {
    push(`/schedule/${id}`);
  }

  const handleNavigateToGroupDetails = (
    id: string
  ) => {
    push(`/group/${id}`);
  }

  return (
    <Card>
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <div className={styles.empty} />
          <div className={styles.header}>
            <h2 className={styles.heading}>
              Seus Grupos
            </h2>
            {!groups.length && (
              <span className={styles.subtitle}>
                Você ainda não está em um grupo
              </span>
            )}
          </div>
          <div className={styles.empty} />
        </div>
        <div className='flex flex-col w-full gap-2'>
          {groups.length > 0 && groups.map(item => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardInfo}>
                <h3 className={styles.groupTheme}>{item.theme}</h3>
                <small className={styles.groupSummary}>{item.summary}</small>
              </div>

              {item.schedule.length === 0 && (
                <div className={styles.buttonsActions}>
                  <Button
                    variant='success'
                    onClick={() => handleNavigateToSchedule(item.id)}
                  >
                    Agendar
                  </Button>

                  <Button
                    variant='success'
                    onClick={() => handleNavigateToGroupDetails(item.id)}
                  >
                    Ver
                  </Button>
                </div>
              )}

              {item.schedule.length > 0 && (
                <div>
                  {`${formatLongDate(new Date(item.schedule[0].date).toLocaleDateString())} ás ${item.schedule[0].hour}`}
                </div>
              )}
            </div>
          ))}
        </div>
        {invites.map(item => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardInfo}>
              <h3 className={styles.groupTheme}>{item.group.theme}</h3>
              <small className={styles.groupSummary}>{item.group.summary}</small>
            </div>

            <div className={styles.buttonActions}>
              <Button
                variant='success'
                onClick={() => handleNavigateToGroupDetails(item.group.id)}
              >
                Ver
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}