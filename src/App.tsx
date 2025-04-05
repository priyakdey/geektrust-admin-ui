import { useEffect, useState } from "react";
import {
  PaginationContainer
} from "./components/PaginationContainer/PaginationContainer.tsx";
import SearchBar from "./components/SearchBar/SearchBar";
import UserTable from "./components/UserTable/UserTable.tsx";
import { User } from "./model/User.ts";
import "./App.css";

const PAGE_SIZE: number = 10;

export function App() {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ paginatedUsers, setPaginatedUsers ] = useState<User[]>([]);

  const [ totalPages, setTotalPages ] = useState<number>(0);
  const [ activePage, setActivePage ] = useState<number>(0);

  function setPageOnClick(page: number): void {
    setActivePage(page);
    const start = (page - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, users.length);
    setPaginatedUsers(users.slice(start, end));
  }

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

  return (
    <div className="App">
      <header className="App-header">
        Admin UI
      </header>
      <main>
        <div className="App-main">
          <div className="SearchBar">
            <SearchBar />
          </div>
          <UserTable users={paginatedUsers} />
          <PaginationContainer activePage={activePage} totalPages={totalPages}
                               setActivePage={setPageOnClick} />
        </div>
      </main>
    </div>
  );
}

export default App;
