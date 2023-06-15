import Image from 'next/image';

import styles from './styles.module.css';


type ProfileButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ProfileButton(props: ProfileButtonProps) {
  return (
    <button
      type="button"
      className={styles.container}
      {...props}
    >
      <Image
        src={require('../../../assets/images/avatar_placeholder.png')}
        className={styles.avatar}
        alt="Avatar"
        width={32}
        height={32}
      />
      <span
        className={styles.buttonText}
      >
        Perfil
      </span>
    </button>
  )
}
