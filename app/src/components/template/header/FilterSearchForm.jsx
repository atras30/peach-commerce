import React from "react";

export default function FilterSearchForm({handleSearch, inputSearch}) {
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <input ref={inputSearch} onInput={handleSearch} className="search" type="text" placeholder="Filter Product . . ." />
      <img className="logosearch" src={require("../../../assets/img/search-icon.png")} alt="Search Icon" />
      <button type="submit" className="d-none"></button>
    </form>
  );
}
