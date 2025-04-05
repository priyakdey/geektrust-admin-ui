import { ChangeEvent, useState } from "react";
import { User } from "../../model/user.d.ts";
import Actions from "../Actions/Actions.tsx";

function title(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface UserRowProps {
  key: string;    // Its react key, wtf it asks me to explicitly declare then?
  user: User;
  isChecked: boolean;
  handleSelectUser: (userId: string) => void;
  handleEditUser: (user: User) => void;
  handleDeleteUser: (userId: string) => void;
}

export function UserRow({
                          user,
                          isChecked,
                          handleSelectUser,
                          handleEditUser,
                          handleDeleteUser
                        }: UserRowProps) {
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const [ editedUser, setEditedUser ] = useState<User>(user);

  function handleEditModeChange() {
    if (!isEditMode) {
      setIsEditMode(true);
    } else {
      // TODO: Clicking on edit mode twice saves the changes, and to cancel the
      // changes, user needs to literally retype the data manually.
      // Since nothing is given as part of req, I am going to handle this in
      // this way, this can later be enhanced.
      handleEditUser(editedUser);
      setIsEditMode(false);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) {
    const value = e.target.value;
    setEditedUser((prev) => ({ ...prev!, [field]: value }));
  }

  return (
    <tr key={user.id}>
      <td>
        {
          !isEditMode
            ? <input type="checkbox" checked={isChecked}
                     onChange={() => handleSelectUser(user.id)} />
            : null
        }
      </td>
      <td>
        {
          !isEditMode
            ? user.name
            : <input type="text" value={editedUser.name}
                     onChange={(e) => handleInputChange(e, "name")} />
        }
      </td>
      <td>
        {
          !isEditMode
            ? user.email
            : <input type="email" value={editedUser.email}
                     onChange={(e) => handleInputChange(e, "email")} />
        }
      </td>
      <td>
        {
          !isEditMode
            ? title(user.role)
            : <select onChange={(e) => handleInputChange(e, "role")}>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
        }
      </td>
      <td>
        <Actions userId={user.id} onEdit={handleEditModeChange}
                 onDelete={handleDeleteUser} />
      </td>
    </tr>
  );
}