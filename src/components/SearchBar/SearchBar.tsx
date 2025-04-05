import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="SearchBar">
      <input className="SearchBar-input" type="text"
             placeholder="Search by name, email or role..." />
    </div>

  );
}