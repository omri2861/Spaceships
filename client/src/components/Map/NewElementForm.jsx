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
  },
}));

const GridItemTextField = (props) => (
  <Grid item>
    <TextField {...props} />
  </Grid>
);

export default function NewElementForm({ newElement, setNewElement }) {
  const classes = useStyles();

  const onChange = (event) => {
    // TODO: Change this patch:
    if (event.target.id === "type") {
      setNewElement((prevElement) => ({
        ...prevElement,
        type: event.target.value,
      }));
    } else {
      setNewElement((prevElement) => ({
        ...prevElement,
        data: { ...prevElement.data, [event.target.id]: event.target.value },
      }));
    }
  };

  return (
    <>
      <Grid container spacing={spacing}>
        <GridItemTextField
          autoFocus
          margin="dense"
          id="name"
          value={newElement.data.name}
          label="Name"
          type="string"
          onChange={onChange}
        />
        <GridItemTextField
          autoFocus
          margin="dense"
          id="image"
          value={newElement.data.image}
          label="Image"
          type="string"
          onChange={onChange}
        />
        <Grid item>
          <FormControl className={classes.selection}>
            <InputLabel>Type</InputLabel>
            <Select id="type" value={newElement.type}>
              <MenuItem value={"vessel"}>Vessel</MenuItem>
              <MenuItem value={"station"}>Station</MenuItem>
              <MenuItem value={"stop"}>Stop</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={spacing}>
        <GridItemTextField
          autoFocus
          margin="dense"
          id="fuel"
          value={newElement.data.fuel}
          label="Fuel (gal.)"
          type="number"
          onChange={onChange}
        />
        <GridItemTextField
          autoFocus
          margin="dense"
          id="speed"
          value={newElement.data.speed}
          label="Speed (Km/h)"
          type="number"
          onChange={onChange}
        />
        <GridItemTextField
          autoFocus
          margin="dense"
          id="engines"
          value={newElement.data.engines}
          label="Engines"
          type="number"
          onChange={onChange}
        />
        <GridItemTextField
          autoFocus
          margin="dense"
          id="species"
          value={newElement.data.species}
          label="Species"
          type="email"
          onChange={onChange}
        />
      </Grid>
    </>
  );
}
