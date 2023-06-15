import { forwardRef } from "react";

import styles from "./styles.module.css";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const CheckboxBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = ({
  id,
  type = 'checkbox',
  label,
  ...rest
}, ref) => {
    return (
      <div className={styles.container}>
        <input
          ref={ref}
          id={id}
          type={type}
          {...rest}
        />
        {label && (
          <label
            htmlFor={id}
            className={styles.label}
          >
            {label}
          </label>
        )}
      </div>
    );
  }

export const Checkbox = forwardRef(CheckboxBase);