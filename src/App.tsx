import React from "react";
import { Header } from "./components/Header/Header";
import {
  PaginationContainer
} from "./components/PaginationContainer/PaginationContainer";
import SearchBar from "./components/SearchBar/SearchBar";
import UserTable from "./components/UserTable/UserTable";
import { useUsers } from "./hooks/useUsers";
import "./App.css";

export function App() {
  const {
    users,
    totalPages,
    activePage,
    selectedUsersIds,
    handlePageChange,
    handleSearch,
    handleClearSearch,
    handleEditUser,
    handleDeleteUser,
    handleDeleteSelectedUsers,
    handleAddSelectUsers
  } = useUsers();

  return (
    <div className="App">
      <Header />
      <main>
        <div className="App-main">
          <div className="SearchBar">
            <SearchBar onSearch={handleSearch}
                       onClearSearch={handleClearSearch} />
          </div>
          <UserTable
            users={users}
            selectedUsersIds={selectedUsersIds}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
            handleAddSelectUsers={handleAddSelectUsers}
          />
          <PaginationContainer
            activePage={activePage}
            totalPages={totalPages}
            setActivePage={handlePageChange}
            handleDeleteSelectedUsers={handleDeleteSelectedUsers}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
