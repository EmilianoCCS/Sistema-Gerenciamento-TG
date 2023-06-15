import { ForwardRefRenderFunction, SelectHTMLAttributes, forwardRef } from "react"
import { FiChevronDown } from "react-icons/fi";

import styles from './styles.module.css';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  isError?: boolean;
};

const SelectBase: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectProps
> = ({
  isError,
  disabled,
  ...rest
}, ref) => {
    return (
      <div className={`${styles.container} ${isError && styles.containerError} ${disabled && styles.containerDisabled}`}>
        <select
          ref={ref}
          className={styles.input}
          disabled={disabled}
          {...rest}
        />
        <div className={`${styles.icon} ${styles.iconRight}`}>
          <FiChevronDown />
        </div>
      </div>
    );
  }

export const Select = forwardRef(SelectBase);
