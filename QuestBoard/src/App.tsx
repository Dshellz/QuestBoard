import QuestList from "./components/QuestList";
import "./App.css";
import AddQuestForm from "./components/AddQuestForm";
import QuestProgress from "./components/QuestProgress";
import QuestLinkCard from "./components/QuestLinkCard";
import { Box, CssVarsProvider } from "@mui/joy";
import { extendTheme } from "@mui/joy/styles";

const customTheme = extendTheme({});

function App() {
  return (
    <div className="container mt-3">
      <CssVarsProvider theme={customTheme}>
        <Box sx={(theme) => theme.typography.h1}>Mon Questboard</Box>
      </CssVarsProvider>
      <QuestLinkCard />
      <AddQuestForm />
      <div>
        <QuestProgress />
        <QuestList />
      </div>
    </div>
  );
}

export default App;
