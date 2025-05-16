import QuestList from "./components/QuestList";
import "./App.css";
import AddQuestForm from "./components/AddQuestForm";
import QuestProgress from "./components/QuestProgress";

function App() {
  return (
    <div className="container mt-3">
      <h1 className="mb-3">Mon QuestBoard</h1>
      <AddQuestForm />
      <div>
        <QuestProgress />
        <QuestList />
      </div>
    </div>
  );
}

export default App;
