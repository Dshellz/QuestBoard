import * as React from "react";
import Button from "@mui/joy/Button";
import Snackbar from "@mui/joy/Snackbar";
import { Box, CssVarsProvider } from "@mui/joy";
import { ElectricBoltOutlined } from "@mui/icons-material";

export default function SnackbarWithDecorators() {
  const [open, setOpen] = React.useState(false);

  return (
    <CssVarsProvider>
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            Oh non flemme
          </Button>
        </Box>
        <Snackbar
          variant="soft"
          color="neutral"
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          startDecorator={<ElectricBoltOutlined />}
          endDecorator={
            <Button
              onClick={() => setOpen(false)}
              size="sm"
              variant="soft"
              color="neutral"
            >
              Ok
            </Button>
          }
        >
          Aller courage !
        </Snackbar>
      </React.Fragment>
    </CssVarsProvider>
  );
}
