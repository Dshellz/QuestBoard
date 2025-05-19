import { render, screen } from "@testing-library/react";
import AddQuestForm from "../components/AddQuestForm";

test("affiche un champ texte et un bouton", () => {
  render(<AddQuestForm />);
  expect(screen.getByRole("button", { name: /ajouter/i })).toBeInTheDocument(); // attends de voir un button nommé ajouter et bien rendu dans le DOM
  expect(screen.getByText("Ajouter une quête")).toBeInTheDocument(); // attends de voir un texte Ajouter une quête et bien rendu dans le DOM
});
