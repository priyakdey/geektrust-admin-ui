import { useRef, useState } from "react";
import { User } from "../../model/user.d.ts";
import "./UserTable.css";
import { UserRow } from "./UserRow.tsx";

interface UserTableProps {
  users: User[];
  handleEditUser: (user: User) => void;
}

export default function UserTable({ users, handleEditUser }: UserTableProps) {
  const [ selectedUsers, setSelectedUsers ] = useState<string[]>([]);

  const selectAllRef = useRef<HTMLInputElement>(null!);

  function handleSelectUser(userId: string) {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
      return;
    }

    setSelectedUsers((prev) => [ ...prev, userId ]);
  }

  function handleSelectAllUsers() {
    if (!selectAllRef.current?.checked) {
      setSelectedUsers([]);
      return;
    }

    const temp: string[] = [];
    users.forEach((user) => {
      temp.push(user.id);
    });
    setSelectedUsers(() => temp);
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
                isChecked={selectedUsers.includes(user.id)}
                handleSelectUser={handleSelectUser}
                handleEditUser={handleEditUser}
              />)
          }
        </tbody>
      </table>
    </div>
  );
}