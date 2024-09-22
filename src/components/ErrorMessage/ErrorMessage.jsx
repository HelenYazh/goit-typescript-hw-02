import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={css.errorMsg}>Something went wrong. Please try again.</p>
  );
};

export default ErrorMessage;
