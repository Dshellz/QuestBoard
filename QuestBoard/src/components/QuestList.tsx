import { useEffect, useState } from "react";
import quete from "../assets/quete.svg";
import { db } from "../firebase";
import { ref, onValue, update, get, remove, set } from "firebase/database";
import QuestItem from "./QuestItem";
import { Box, Button, ButtonGroup, CssVarsProvider } from "@mui/joy";
import theme from "./theme";
import SnackbarWithDecorators from "./QuestSnackBar";

type Item = {
  // TypeScript type pour l'item quête
  id: string;
  quete: string;
  completed: boolean;
};

const QuestList = () => {
  const [quests, setQuests] = useState<Item[]>([]); // inititalise l'état avec un tableau vide et lui donne un type
  const [points, setPoints] = useState<number>(0);

  const handleToggle = async (questId: string, currenState: boolean) => {
    const questRef = ref(db, `quetes/${questId}`); // se refère à l'id de la quête
    await update(questRef, { completed: !currenState }); // update l'état de la quête
  };

  useEffect(() => {
    const quetesRef = ref(db, "quetes");
    const unsubscribe = onValue(quetesRef, (snapshot) => {
      // onValue ecoute les modifs en real time de la db
      const data = snapshot.val(); // récupère les quêtes
      if (!data) return setQuests([]);

      const loadedQuests = Object.entries(data).map(
        // transforme l'objet en tableau car firebase renvoi un objet
        ([id, quest]: any) => ({
          id,
          quete: quest.quete,
          completed: quest.completed,
        })
      );
      setQuests(loadedQuests); // met à jour l'état avec les quêtes chargées (re-render automatiquement le composant)
    });

    return () => unsubscribe(); // nettoyage car risque de fuites de mémoire quand le composant se démonte
  }, []);

  useEffect(() => {
    const pointsRef = ref(db, "utilisateur/points");
    const unsubscribe = onValue(pointsRef, (snapshot) => {
      const val = snapshot.val();
      setPoints(val || 0);
    });
    return () => unsubscribe();
  }, []); // Les [] signifient que ça s'exécute une seule fois, à l'initialisation du composant.

  const handleValidateAll = async () => {
    try {
      const completedQuests = quests.filter((q) => q.completed);

      if (completedQuests.length === 0) return;

      // Lire les points now
      const pointsRef = ref(db, "utilisateur/points");
      const snapshot = await get(pointsRef);
      const currentPoints = snapshot.val() || 0;

      // Ajout des 10 points
      const newPoints = currentPoints + completedQuests.length * 10;
      await set(pointsRef, newPoints);

      // Supprimer les quêtes validées de la db
      for (const quest of completedQuests) {
        const questRef = ref(db, `quetes/${quest.id}`);
        await remove(questRef);
      }
    } catch (err) {
      console.log("Erreur", err); // avoir les erreurs dans la console du nav
    }
  };

  return (
    <div className="mt-4">
      <div className="d-flex align-items-center mb-3">
        <CssVarsProvider theme={theme}>
          <Box sx={(theme) => theme.typography.h2}>Liste des quêtes</Box>
        </CssVarsProvider>
        <img
          src={quete}
          alt="quete"
          style={{
            width: "25px",
            height: "25px",
            marginLeft: "10px",
          }}
        />
      </div>
      <CssVarsProvider theme={theme}>
        <Box sx={(theme) => theme.typography.h3}>Points Totaux : {points}</Box>
      </CssVarsProvider>

      <ul className="list-group">
        {quests.map((quest) => (
          <QuestItem
            key={quest.id}
            id={quest.id}
            quete={quest.quete}
            completed={quest.completed}
            onToggle={handleToggle}
          />
        ))}
      </ul>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <ButtonGroup size="sm" aria-label="solid button group">
          <Button
            data-testid="btn-valid"
            color="success"
            onClick={handleValidateAll}
          >
            Valider
          </Button>
          <Button>
            <SnackbarWithDecorators />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default QuestList;
