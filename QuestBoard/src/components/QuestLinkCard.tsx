import { Avatar, Box, Card, Link, Typography } from "@mui/joy";

function QuestLinkCard() {
  return (
    <div className="mb-3 mt-3">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          variant="outlined"
          sx={{ display: "inline-flex", gap: 2, alignItems: "center" }}
        >
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
      </Box>
    </div>
  );
}

export default QuestLinkCard;
