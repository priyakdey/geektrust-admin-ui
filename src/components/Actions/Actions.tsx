import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "./Actions.css";

interface ActionsProps {
  userId: string;
  onEdit: (string) => void;
  onDelete: (string) => void;
}

export default function Actions({ userId, onEdit, onDelete }: ActionsProps) {
  return (
    <div className="Actions-container">
      <FaRegEdit onClick={() => onEdit(userId)} />
      <MdDeleteOutline fill="#FE4C43" onClick={() => onDelete(userId)} />
    </div>
  );
}