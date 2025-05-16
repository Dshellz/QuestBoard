import type { FC } from "react";
import Button from "react-bootstrap/Button";

type QuestItemProps = {
  id: string;
  quete: string;
  completed: boolean;
  onToggle: (id: string, completed: boolean) => void;
};

const QuestItem: FC<QuestItemProps> = ({ id, quete, completed, onToggle }) => {
  return (
    <li className="list-group-item">
      <input
        className="form-check-input me-1 mb-2 mt-2"
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, completed)}
        id={`checkboxStretched-${id}`}
      />
      <label
        className="form-check-label stretched-link ms-3"
        htmlFor={`checkboxStretched-${id}`}
      >
        <div className="">
          {quete}
          <Button variant="danger" size="sm" className="ms-2">
            Supprimer
          </Button>
        </div>
      </label>
    </li>
  );
};

export default QuestItem;
