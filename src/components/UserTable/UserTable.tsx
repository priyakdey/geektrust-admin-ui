import { useEffect, useRef } from "react";
import { User } from "../../model/user.d.ts";
import "./UserTable.css";
import { UserRow } from "./UserRow.tsx";

interface UserTableProps {
  users: User[];
  selectedUsersIds: string[];
  handleEditUser: (user: User) => void;
  handleDeleteUser: (userId: string) => void;
  handleAddSelectUsers: (reset?: boolean, ...userIds: string[]) => void;
}

export default function UserTable({
                                    users,
                                    selectedUsersIds,
                                    handleEditUser,
                                    handleDeleteUser,
                                    handleAddSelectUsers
                                  }: UserTableProps) {


  const selectAllRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    selectAllRef.current!.checked = false;
  }, [ users ]);

  function handleSelectUser(userId: string) {
    handleAddSelectUsers(false, userId);
  }

  function handleSelectAllUsers() {
    if (!selectAllRef.current?.checked) {
      handleAddSelectUsers();
      return;
    }

    handleAddSelectUsers(true, ...users.map((user) => user.id));
  }

  return (
    <div className="UserTable-container">
      <table className="UserTable">
        <thead>
          <tr>
            <td>
              <input id="selectAllCheckbox" type="checkbox"
                     onChange={handleSelectAllUsers} ref={selectAllRef} />
            </td>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) =>
              <UserRow
                key={user.id}
                user={user}
                isChecked={selectedUsersIds.includes(user.id)}
                handleSelectUser={handleSelectUser}
                handleEditUser={handleEditUser}
                handleDeleteUser={handleDeleteUser}
              />)
          }
        </tbody>
      </table>
    </div>
  );
}