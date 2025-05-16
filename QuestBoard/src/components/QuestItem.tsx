import type { FC } from "react";
import Button from "react-bootstrap/Button";

type QuestItemProps = {
  id: string;
  quete: string;
  completed: boolean;
  onToggle: (id: string, completed: boolean) => void;
};

const QuestItem: FC<QuestItemProps> = ({ id, quete, completed, onToggle }) => {
  // type un composant fonctionnelle
  return (
    <li className="list-group-item d-flex align-items-center">
      <input
        className="form-check-input me-1 mb-2 mt-2"
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, completed)}
        id={`checkboxStretched-${id}`}
      />
      <label
        className="form-check-label stretched-link ms-3"
        htmlFor={`checkboxStretched-${id}`} // relier à l'id pour pouvoir faire comprendre que la checkbox est cochée
      >
        <div className="">{quete}</div>
      </label>
      <Button variant="danger" size="sm" className="ms-2">
        {/* onClick={() => onDelete(id)} */}
        Supprimer
      </Button>
    </li>
  );
};

export default QuestItem;
