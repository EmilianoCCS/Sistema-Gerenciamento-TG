import styles from "./styles.module.css";

type CardProps = {
  children: React.ReactNode;
};

export function Card({
  children,
}: CardProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}