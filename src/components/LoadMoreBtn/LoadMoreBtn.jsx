import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.btn} type="button">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
