import { useRef, useState } from "react";
import { User } from "../../model/User.ts";
import Actions from "../Actions/Actions.tsx";
import "./UserTable.css";

interface UserTableProps {
  users: User[];
}

function title(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function UserTable({ users }: UserTableProps) {
  const [ selectedUsers, setSelectedUsers ] = useState<string[]>([]);

  const selectAllRef = useRef<HTMLInputElement>(null);


  function handleOnEdit(userId) {

  }

  function handleOnDelete(userId) {
    console.log("delete", userId);
  }

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
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <input type="checkbox"
                           checked={selectedUsers.includes(user.id)}
                           onChange={() => handleSelectUser(user.id)} />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{title(user.role)}</td>
                  <td>
                    <Actions userId={user.id} onEdit={handleOnEdit}
                             onDelete={handleOnDelete} />
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}