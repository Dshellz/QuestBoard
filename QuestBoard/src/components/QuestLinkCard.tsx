import { Avatar, Card, Link, Typography } from "@mui/joy";

function QuestLinkCard() {
  return (
    <div className="mb-3 mt-3">
      <Card variant="outlined" sx={{ display: "flex", gap: 2 }}>
        <Avatar
          size="lg"
          src="https://avatars.githubusercontent.com/u/184849123?v=4"
        />
        <Link
          overlay
          href="https://github.com/Dshellz"
          target="_blank"
          underline="none"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography level="body-md">Dshellz</Typography>
          <Typography level="body-sm">
            Pour plus de projets consulter mon Github !
          </Typography>
        </Link>
      </Card>
    </div>
  );
}

export default QuestLinkCard;
