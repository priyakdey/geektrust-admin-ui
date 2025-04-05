import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "./Actions.css";

interface ActionsProps {
  userId: string;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export default function Actions({ userId, onEdit, onDelete }: ActionsProps) {
  return (
    <div className="Actions-container">
      <FaRegEdit role="button" className="action-icon edit"
                 onClick={() => onEdit(userId)} />
      <MdDeleteOutline role="button" className="action-icon delete"
                       fill="#FE4C43"
                       onClick={() => onDelete(userId)} />
    </div>
  );
}