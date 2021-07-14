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
import ImageSelection from "./ImageSelection";

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

export default function NewEntityForm({ newElement, setNewElement }) {
  const classes = useStyles();

  const onChange = (event) => {
    setNewElement((prevElement) => ({
      ...prevElement,
      data: { ...prevElement.data, [event.target.id]: event.target.value },
    }));
  };

  const setImage = (newImageName) =>
    setNewElement((prevElement) => ({
      ...prevElement,
      data: { ...prevElement.data, image: newImageName },
    }));

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
        <Grid item sm={6}>
          <ImageSelection value={newElement.data.image} setValue={setImage} />
        </Grid>
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
