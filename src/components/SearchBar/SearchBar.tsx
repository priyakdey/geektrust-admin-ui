import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (string) => void;
  onClearSearch: () => void;
}

export default function SearchBar({ onSearch, onClearSearch }: SearchBarProps) {
  const [ searchInput, setSearchInput ] = useState<string>("");

  return (
    <div className="SearchBar">
      <input
        className="SearchBar-input" type="text"
        placeholder="Search by name, email or role..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            onSearch(searchInput.trim());
          }
        }}
      />
      <button className="clear-search-bar-btn" onClick={() => {
        setSearchInput("");
        onClearSearch();
      }}>
        Clear Filter
      </button>
    </div>

  );
}