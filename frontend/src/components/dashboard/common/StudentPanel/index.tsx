import { useRouter } from 'next/navigation';

import styles from './styles.module.css';

import { Group, Invite } from '@/types';

import { Card } from "@/components/common/Card";
import { Button } from '@/components/common/Button';
import { api } from '@/services/apiClient';

type StudentPanelProps = {
  group?: Group | null;
  invites: Invite[];
  onAccept: (id: string) => Promise<void>;
  onDecline: (id: string) => Promise<void>;
};

export function StudentPanel({ group, invites, onAccept, onDecline }: StudentPanelProps) {
  const { push } = useRouter();

  const handleNavigateToGroup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    push("/group");
  }

  const handleNavigateToGroupDetails = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    push(`/group/${group?.id}`);
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
            {!group && (
              <span className={styles.subtitle}>
                Você ainda não está em um grupo
              </span>
            )}
          </div>
          <div className={styles.empty} >
            {!group && (
              <Button
                variant='success'
                onClick={handleNavigateToGroup}
              >
                Criar Grupo
              </Button>
            )}
          </div>
        </div>
        {group && (
          <div className={styles.card}>
            <div className={styles.cardInfo}>
              <h3 className={styles.groupTheme}>{group.theme}</h3>
              <small className={styles.groupSummary}>{group.summary}</small>
            </div>

            <div className={styles.buttonActions}>
              <Button
                variant='success'
                onClick={handleNavigateToGroupDetails}
              >
                Ver
              </Button>
              {/* <Button variant='cancel'>
                Deletar
              </Button> */}
            </div>
          </div>
        )}
        {invites.map(item => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardInfo}>
              <h3 className={styles.groupTheme}>{item.group.theme}</h3>
              <small className={styles.groupSummary}>{item.group.summary}</small>
            </div>

            <div className={styles.buttonInvitesActions}>
              <Button
                variant='success'
                onClick={() => onAccept(item.id)}
              >
                Aceitar
              </Button>
              <Button
                variant='cancel'
                onClick={() => onDecline(item.id)}
              >
                Recusar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}