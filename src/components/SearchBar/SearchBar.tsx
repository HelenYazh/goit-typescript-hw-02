import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FcSearch } from "react-icons/fc";

interface SearchBarProps {
  onSubmit: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const keyword = (form.elements.namedItem("keyword") as HTMLInputElement)
      .value;

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
