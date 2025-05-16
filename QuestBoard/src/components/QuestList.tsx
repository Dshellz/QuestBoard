import { useEffect, useState } from "react";
import quete from "../assets/quete.svg";
import { db } from "../firebase";
import { ref, onValue, update, get, remove, set } from "firebase/database";
import Button from "react-bootstrap/Button";

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
      setQuests(loadedQuests);
    });

    return () => unsubscribe(); // nettoyage
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
      const currentPoints = snapshot.val() || 0; // à voir

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
        <h2 className="">Liste des quêtes</h2>

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
      <h3>Points Totaux : {points}</h3>

      <ul className="list-group">
        {quests.map((quest) => (
          <li key={quest.id} className="list-group-item">
            <input
              className="form-check-input me-1"
              type="checkbox"
              checked={quest.completed}
              onChange={() => handleToggle(quest.id, quest.completed)} // onChange appelle la fonction handleToggle
              id={`checkboxStretched-${quest.id}`} // Donne un ID unique à chaque checkbox
            />
            <label
              className="form-check-label stretched-link ms-3"
              htmlFor={`checkboxStretched-${quest.id}`} // ce label associé à l’input qui a cet ID, ça active la checkbox correspondante.
            >
              {quest.quete}
              <Button variant="outline-danger" className="btn ms-3">
                Supprimer
              </Button>
            </label>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-success btn-sm mt-3 ms-3"
        type="button"
        onClick={handleValidateAll}
      >
        Valider
      </button>
    </div>
  );
};

export default QuestList;
