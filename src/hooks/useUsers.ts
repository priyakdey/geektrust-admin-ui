import { useState, useEffect } from "react";
import { User } from "../model/user";

const PAGE_SIZE = 10;

export const useUsers = () => {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ paginatedUsers, setPaginatedUsers ] = useState<User[]>([]);
  const [ totalPages, setTotalPages ] = useState<number>(0);
  const [ activePage, setActivePage ] = useState<number>(0);
  const [ selectedUsersIds, setSelectedUsersIds ] = useState<string[]>([]);

  useEffect(() => {
    async function fetchUsers(): Promise<User[]> {
      const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      if (res.status !== 200) {
        throw new Error(`Failed to fetch users with status code ${res.status}`);
      }
      return await res.json();
    }

    fetchUsers()
      .then(data => {
        setUsers(data);
        updatePaginatedUsers(data, 1);
      })
      .catch(err => {
        console.error("Failed to fetch users:", err);
        // TODO: Implement proper error handling
      });
  }, []);

  const updatePaginatedUsers = (userList: User[], page: number) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, userList.length);
    setPaginatedUsers(userList.slice(start, end));
    setTotalPages(Math.ceil(userList.length / PAGE_SIZE));
    setActivePage(page);
  };

  const handlePageChange = (page: number): void => {
    updatePaginatedUsers(users, page);
    setSelectedUsersIds([]);
  };

  const handleSearch = (searchInput: string): void => {
    if (searchInput === "") {
      handleClearSearch();
      return;
    }

    const filteredUsers = users.filter((user: User) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.role.toLowerCase().includes(searchInput.toLowerCase())
    );

    updatePaginatedUsers(filteredUsers, filteredUsers.length > 0 ? 1 : 0);
  };

  const handleClearSearch = () => {
    updatePaginatedUsers(users, 1);
  };

  const handleEditUser = (user: User) => {
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      const updatedUsers = [ ...users ];
      updatedUsers[index] = user;
      setUsers(updatedUsers);
      updatePaginatedUsers(updatedUsers, activePage);
    }
  };

  const handleDeleteUser = (userId: string) => {
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) return;

    const updatedUsers = [ ...users.slice(0, index), ...users.slice(index + 1) ];
    deleteUsers(updatedUsers);
  };

  const handleDeleteSelectedUsers = () => {
    const updatedUsers = users.filter((user) => !selectedUsersIds.includes(user.id));
    deleteUsers(updatedUsers);
  };

  const deleteUsers = (users: User[]) => {
    const newTotalPages = Math.ceil(users.length / PAGE_SIZE);
    const newActivePage = activePage <= newTotalPages ? activePage : activePage - 1;

    setUsers(users);
    updatePaginatedUsers(users, newActivePage);
    setSelectedUsersIds([]);
    setActivePage(newActivePage);
    setTotalPages(newTotalPages);
  };

  const handleAddSelectUsers = (reset: boolean = false, ...userIds: string[]) => {
    if (userIds.length === 0) {
      setSelectedUsersIds([]);
      return;
    }

    if (reset) {
      setSelectedUsersIds(userIds);
      return;
    }

    setSelectedUsersIds(prev => {
      const newSelection = [ ...prev ];
      for (const userId of userIds) {
        const index = newSelection.indexOf(userId);
        if (index === -1) {
          newSelection.push(userId);
        } else {
          newSelection.splice(index, 1);
        }
      }
      return newSelection;
    });
  };

  return {
    users: paginatedUsers,
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
  };
}; 