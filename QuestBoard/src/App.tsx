import QuestList from "./components/QuestList";
import "./App.css";
import AddQuestForm from "./components/AddQuestForm";
import QuestProgress from "./components/QuestProgress";
import QuestLinkCard from "./components/QuestLinkCard";
import { Box, CssVarsProvider } from "@mui/joy";
import theme from "./components/theme";
import SnackbarWithDecorators from "./components/QuestSnackBar";

function App() {
  return (
    <div className="container mt-3">
      <CssVarsProvider theme={theme}>
        <Box
          sx={(theme) => ({
            backgroundColor: "var(--joy-palette-success-300, #A1E8A1)",
            ...theme.typography.h1,
            padding: "8px",
            borderRadius: "4px",
            display: "inline-block",
          })}
        >
          Mon Questboard
        </Box>
      </CssVarsProvider>
      <QuestLinkCard />
      <AddQuestForm />

      <div>
        <QuestProgress />
        <QuestList />
        <SnackbarWithDecorators />
      </div>
    </div>
  );
}

export default App;
