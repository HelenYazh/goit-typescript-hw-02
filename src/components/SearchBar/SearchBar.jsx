import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FcSearch } from "react-icons/fc";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const keyword = form.elements.keyword.value;

    if (keyword.trim() === "") {
      toast.error("Please enter your search query for images");
      return;
    }

    onSubmit(keyword);
    form.reset();
  };

  return (
    <header className={css.header}>
      <div>
        <Toaster />
      </div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          name="keyword"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          <FcSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
