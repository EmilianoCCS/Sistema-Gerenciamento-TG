import styles from './styles.module.css';

import { clsx } from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'cancel';
};

export function Button({
  variant = 'primary',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.default, [
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        variant === 'success' && styles.success,
        variant === 'cancel' && styles.cancel,
      ])}
      {...rest}
    />
  );
}