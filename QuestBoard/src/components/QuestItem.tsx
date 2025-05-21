import { ref, remove } from "firebase/database";
import { type FC } from "react";
import Button from "@mui/joy/Button";
import { db } from "../firebase";
import { Close } from "@mui/icons-material";

type QuestItemProps = {
  id: string;
  quete: string;
  completed: boolean;
  onToggle: (id: string, completed: boolean) => void;
};

const onDelete = (id: string) => {
  // Fonction pour supprimer une quête
  const questRef = ref(db, `quetes/${id}`);
  remove(questRef);
};

const QuestItem: FC<QuestItemProps> = ({ id, quete, completed, onToggle }) => {
  // type un composant fonctionnelle
  return (
    <li className="list-group-item d-flex align-items-center">
      <div className="d-flex align-items-center">
        <input // // input checkbox
          className="form-check-input me-1 mb-2 mt-2"
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id, completed)}
          id={`checkboxStretched-${id}`} //  identifiant unique pour l’input
        />
        <label
          className="form-check-label ms-3"
          htmlFor={`checkboxStretched-${id}`} // pour lier le label à l’input
        >
          <div className="">{quete}</div>
        </label>
      </div>
      <div className="ms-3">
        <Button
          sx={{
            padding: "2px 4px",
            minWidth: "auto",
            borderRadius: "15px",
          }}
          size="sm"
          variant="outlined"
          color="danger"
          onClick={() => onDelete(id)}
        >
          {<Close />}
        </Button>
      </div>
    </li>
  );
};

export default QuestItem;
