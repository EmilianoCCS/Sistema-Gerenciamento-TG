import { forwardRef } from "react"

import styles from "./styles.module.css";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isError?: boolean;
};

const TextInputBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = ({
  iconLeft,
  iconRight,
  isError,
  disabled,
  ...rest
}, ref) => {
    return (
      <div className={`${styles.container} ${isError && styles.containerError} ${disabled && styles.containerDisabled}`}>
        {iconLeft && (
          <div className={`${styles.icon} ${styles.iconLeft}`}>
            {iconLeft}
          </div>
        )}
        <input
          ref={ref}
          className={styles.input}
          disabled={disabled}
          {...rest}
        />
        {iconRight && (
          <div className={`${styles.icon} ${styles.iconRight}`}>
            {iconRight}
          </div>
        )}
      </div>
    );
  }

export const TextInput = forwardRef(TextInputBase);
