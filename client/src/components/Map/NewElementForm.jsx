import {
  Divider,
  Grid,
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

const spacing = 2;

const useStyles = makeStyles((theme) => ({
  selection: {
    minWidth: "120px",
  },
  divider: {
      marginTop: theme.spacing(spacing),
  }
}));

const GridItemTextField = (props) => (
  <Grid item>
    <TextField {...props} />
  </Grid>
);

export default function NewElementForm() {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={spacing}>
        <GridItemTextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="string"
        />
        <GridItemTextField
          autoFocus
          margin="dense"
          id="image"
          label="Image"
          type="string"
        />
        <Grid item>
          <FormControl className={classes.selection}>
            <InputLabel>Type</InputLabel>
            <Select id="type">
              <MenuItem value={"vessel"}>Vessel</MenuItem>
              <MenuItem value={"station"}>Station</MenuItem>
              <MenuItem value={"stop"}>Stop</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider className={classes.divider}/>
      <Grid container spacing={spacing}>
        <GridItemTextField
          autoFocus
          margin="dense"
          id="fuel"
          label="Fuel (gal.)"
          type="number"
        />
        <GridItemTextField
          autoFocus
          margin="dense"
          id="speed"
          label="Speed (Km/h)"
          type="number"
        />
        <GridItemTextField
          autoFocus
          margin="dense"
          id="engines"
          label="Engines"
          type="number"
        />
        <GridItemTextField
          autoFocus
          margin="dense"
          id="species"
          label="Species"
          type="email"
        />
      </Grid>
    </>
  );
}
