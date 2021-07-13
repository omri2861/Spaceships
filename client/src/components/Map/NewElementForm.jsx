import { Box, TextField } from "@material-ui/core";

export default function NewElementForm() {
  return (
    <Box>
      <TextField
        autoFocus
        margin="dense"
        id="fuel"
        label="Fuel (gal.)"
        type="number"
      />
      <TextField
        autoFocus
        margin="dense"
        id="speed"
        label="Speed (Km/h)"
        type="number"
      />
      <TextField
        autoFocus
        margin="dense"
        id="engines"
        label="Engines"
        type="number"
      />
      <TextField
        autoFocus
        margin="dense"
        id="species"
        label="Species"
        type="email"
      />
    </Box>
  );
}
