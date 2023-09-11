import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import defaultClasses from "./input.module.css";
import { mergeClasses } from "@/util/mergeClasses";
interface InputProps {
  icon: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  action: () => void;
  classes?: {
    root?: string;
    inputRoot?: string;
    icon?: string;
  };
  size?: number;
  value?: string;
  placeholder?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({ icon, onChange, action, ...props }) => {
  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <div className={classes.root}>
      <input onChange={onChange} className={classes.inputRoot} {...props} />
      {icon && (
        <button onClick={action}>
          <Icon
            className={classes.icon}
            size={props.size || "20px"}
            path={icon}
          />
        </button>
      )}
    </div>
  );
};

export default Input;
