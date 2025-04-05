import { useEffect, useState } from "react";
import {
  PaginationContainer
} from "./components/PaginationContainer/PaginationContainer.tsx";
import SearchBar from "./components/SearchBar/SearchBar";
import UserTable from "./components/UserTable/UserTable.tsx";
import { User } from "./model/user.d.ts";
import "./App.css";

const PAGE_SIZE: number = 10;

export function App() {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ paginatedUsers, setPaginatedUsers ] = useState<User[]>([]);

  const [ totalPages, setTotalPages ] = useState<number>(0);
  const [ activePage, setActivePage ] = useState<number>(0);

  useEffect(() => {
    async function fetchUsers(): Promise<User[]> {
      // We fetch all users, since the API does not support pagination
      // Cool implementation would be to fetch pages and store them in the state
      const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      if (res.status !== 200) {
        return Promise.reject(`Failed to fetch users with status code ${res.status}`);
      }

      return await res.json();
    }

    fetchUsers()
      .then(data => {
        // TODO: Validate the input
        data.sort((user1: User, user2: User) => user1.id.localeCompare(user2.id));
        setUsers(data);
        setPaginatedUsers(data.slice(0, PAGE_SIZE));
        const totalPages: number = Math.ceil(data.length / PAGE_SIZE);
        setTotalPages(totalPages);
        setActivePage(1);
      })
      .catch(err => console.log(err));    // TODO: Serve an error page

  }, []);

  function setPageOnClick(page: number): void {
    setActivePage(page);
    const start = (page - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, users.length);
    setPaginatedUsers(users.slice(start, end));
  }

  function onSearch(searchInput: string): void {
    if (searchInput === "") {
      onClearSearch();
      return;
    }

    const temp = [];
    users.forEach((user: User) => {
      if (user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.role.toLowerCase().includes(searchInput.toLowerCase())) {
        temp.push(user);
      }
    });

    if (temp.length == 0) {
      setPaginatedUsers(temp);
      setTotalPages(0);
      setActivePage(0);
      return;
    }

    setActivePage(1);
    setTotalPages(Math.ceil(temp.length / PAGE_SIZE));
    const start = 0;
    const end = Math.min(start + PAGE_SIZE, temp.length);
    setPaginatedUsers(temp.slice(start, end));
  }

  function onClearSearch() {
    setActivePage(1);
    setTotalPages(Math.ceil(users.length / PAGE_SIZE));
    const start = 0;
    const end = Math.min(start + PAGE_SIZE, users.length);
    setPaginatedUsers(users.slice(start, end));
  }

  function handleEditUser(user: User) {
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      const updatedUsers = [ ...users ];
      updatedUsers[index] = user;
      setUsers(updatedUsers);
      setPaginatedUsers(updatedUsers.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE));
    }
  }

  function handleDeleteUser(userId: string) {
    const index = users.findIndex((user) => user.id === userId);
    if (index == -1) return;

    const temp = [ ...users.slice(0, index), ...users.slice(index + 1, users.length) ];
    console.log(temp);

    const newTotalPages = Math.ceil(temp.length / PAGE_SIZE);
    const newActivePage = activePage <= newTotalPages ? activePage : activePage - 1;

    const start = (newActivePage - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, temp.length);

    setActivePage(newActivePage);
    setTotalPages(newTotalPages);
    setUsers(temp);
    setPaginatedUsers(temp.slice(start, end));
  }

  return (
    <div className="App">
      <header className="App-header">
        Admin UI
      </header>
      <main>
        <div className="App-main">
          <div className="SearchBar">
            <SearchBar onSearch={onSearch} onClearSearch={onClearSearch} />
          </div>
          <UserTable users={paginatedUsers} handleEditUser={handleEditUser}
                     handleDeleteUser={handleDeleteUser} />
          <PaginationContainer activePage={activePage} totalPages={totalPages}
                               setActivePage={setPageOnClick} />
        </div>
      </main>
    </div>
  );
}

export default App;
