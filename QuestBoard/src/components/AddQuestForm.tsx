import { useState, type FormEvent } from "react";
import { db } from "../firebase";
import { ref, push } from "firebase/database";
import bolt from "../assets/bolt.svg";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { Box } from "@mui/joy";

const AddQuestForm = () => {
  const [quete, setQuete] = useState("");
  const customTheme = extendTheme({});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Empecher le rechargement de la page

    if (!quete.trim()) return; // si le champs est vide ou vide rien ne se passe

    try {
      const quetesRef = ref(db, "quetes"); // créer la référence à la branche quetes de ma RTDB
      await push(quetesRef, {
        // ajout de la quête avec un id auto
        quete: quete.trim(), // titre quête
        completed: false, // état de la quete
        points: 10,
        createdAt: Date.now(),
      });

      setQuete(""); // pour vider le champ
      console.log("Quête ajoutée"); // pas obligatoire mais en cas d'erreur s'affiche dans la console
    } catch (error) {
      console.log("Erreur lors de l'ajout :", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          <div className="d-flex align-items-center">
            <CssVarsProvider theme={customTheme}>
              <Box sx={(theme) => theme.typography.h3}>Ajouter une quête</Box>
            </CssVarsProvider>
            <img
              src={bolt}
              alt="bolt"
              style={{
                width: "25px",
                height: "25px",
                marginLeft: "10px",
              }}
            />
          </div>
        </label>
        <input
          id="quêtes"
          type="text"
          className="form-control"
          value={quete}
          onChange={(e) => setQuete(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center mb-2">
        <button className="btn btn-success" type="submit">
          Ajouter
        </button>
      </div>
    </form>
  );
};

export default AddQuestForm;
