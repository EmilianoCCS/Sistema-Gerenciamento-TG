import styles from "./styles.module.css";

type ToggleButtonProps = React.InputHTMLAttributes<HTMLInputElement>;

export function ToggleButton({ id, ...rest }: ToggleButtonProps) {
  return (
    <label
      htmlFor={id}
      className={styles.container}
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        {...rest}
      />
      <span
        className="absolute w-2/5 h-4/5 bg-[#2c3e50] rounded-full left-1 top-1 peer-checked:bg-[#4ca2af] peer-checked:left-11 transition-all duration-300 ease-in-out"
      >
      </span>
    </label>
  );
}