import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { Box } from "@mui/joy";

function QuestProgress() {
  const [points, setPoints] = useState(0); // commence à 0 par défaut
  const objectif = 70;

  useEffect(() => {
    const pointsRef = ref(db, "utilisateur/points");
    const unsubscribe = onValue(pointsRef, (snapshot) => {
      // écoute en temps réel les changements
      const val = snapshot.val(); // récupère la valeur des points depuis Firebase
      setPoints(val || 0); // va mettre à jour la valeur que je reçois depuis Firebase ou sinon choisir 0 si il n'y a rien
    });

    return () => unsubscribe();
  }, []);
  const customTheme = extendTheme({});
  const progress = Math.min((points / objectif) * 100, 100); // Calcul pour faire un %

  useEffect(() => {
    if (progress > 99) {
      // Motivation pour l'utilisateur avec alertes
      alert("Bravo ! Vous avez atteint votre objectif ! 🎉");
    } else if (progress > 50) {
      alert("Vous y êtes presque ! 🙌");
    }
  }, [progress]); // Exécute ce useEffect uniquement quand la valeur change

  return (
    <div className="mt-2">
      <CssVarsProvider theme={customTheme}>
        <Box sx={(theme) => theme.typography.h4}>
          Atteignez votre objectif quotidien de {objectif} points !
        </Box>
      </CssVarsProvider>
      <ProgressBar
        variant="success"
        label={`${Math.round(progress)}%`} // Affiche le % de progression
        now={progress}
        animated
      />
    </div>
  );
}

export default QuestProgress;
