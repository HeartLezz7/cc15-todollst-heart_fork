import { FaSearch } from "react-icons/fa";
import styles from "./Search.module.scss";
import useTodo from "../../../hooks/useTodo";
import { useEffect, useState } from "react";

function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { searchTodo } = useTodo();

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      console.log("Search");
      if (searchKeyword.trim() !== "") searchTodo(searchKeyword);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchKeyword]);

  const handleChangeInput = (e) => {
    setSearchKeyword(e.target.value);
    searchTodo(e.target.value);
  };
  return (
    <div className={styles.search}>
      <span className={styles.search__icon}>
        <FaSearch />
      </span>
      <input
        type="text"
        placeholder="search"
        className={styles.search__input}
        value={searchKeyword}
        onChange={handleChangeInput}
      />
    </div>
  );
}

export default Search;
