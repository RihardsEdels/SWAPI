import { mergeClasses } from "@/util/mergeClasses";
import defaultClasses from "./button.module.css";
import { ReactElement } from "react";

interface ButtonProps {
  children: string;
  classes?: {
    root: string;
  };
  id?: string;
  disabled?: boolean;
  type?: "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  return (
    <button className={classes.root} {...props}>
      {children}
    </button>
  );
};

export default Button;
