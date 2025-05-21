import { ref, remove, update } from "firebase/database";
import { useState, type FC } from "react";
import { db } from "../firebase";
import { Close, Edit } from "@mui/icons-material";
import { Button, Typography } from "@mui/joy";
import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";

type QuestItemProps = {
  id: string;
  quete: string;
  completed: boolean;
  onToggle: (id: string, completed: boolean) => void;
};

const QuestItem: FC<QuestItemProps> = ({ id, quete, completed, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuete, setEditedQuete] = useState(quete);

  const handleEdit = () => {
    const questRef = ref(db, `quetes/${id}`);
    update(questRef, {
      quete: editedQuete,
    }).then(() => {
      setIsEditing(false);
    });
  };

  const onDelete = (id: string) => {
    // Fonction pour supprimer une quête
    const questRef = ref(db, `quetes/${id}`);
    remove(questRef);
  };

  // type un composant fonctionnelle
  return (
    <li className="list-group-item d-flex align-items-center">
      <div className="d-flex align-items-center">
        <Checkbox
          checked={completed}
          onChange={() => onToggle(id, completed.valueOf())} // pour valider simplement
        />
        {isEditing ? (
          <>
            <TextField
              value={editedQuete}
              onChange={(e) => setEditedQuete(e.target.value)}
              size="small"
              sx={{ ml: 2 }}
            />
            <Button
              size="sm"
              variant="outlined"
              color="success"
              onClick={handleEdit}
              sx={{ ml: 1 }}
            >
              Sauvegarder
            </Button>
          </>
        ) : (
          <Typography sx={{ ml: 2 }}>{quete}</Typography>
        )}
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
        <Button
          sx={{
            padding: "2px 4px",
            minWidth: "auto",
            borderRadius: "15px",
            marginLeft: "5px",
          }}
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setIsEditing(true)}
        >
          {<Edit />}
        </Button>
      </div>
    </li>
  );
};

export default QuestItem;
