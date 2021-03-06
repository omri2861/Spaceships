import {
  Divider,
  Grid,
  TextField as MuiTextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import ImageSelection from "./ImageSelection";
import { Fuel, Speed, Engines, Species } from "../../../Icons";

const spacing = 2;

const useStyles = makeStyles((theme) => ({
  selection: {
    minWidth: "120px",
  },
  divider: {
    marginTop: theme.spacing(spacing),
  },
}));

const TextField = (props) => (
  <Grid item>
    <MuiTextField {...props} />
  </Grid>
);

const IconTextField = (props) => (
  <Grid item>
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item>{props.icon}</Grid>
      <Grid item>
        <TextField {...props} />
      </Grid>
    </Grid>
  </Grid>
);

export default function NewEntityForm({ newElement, setNewElement }) {
  const classes = useStyles();

  const onChange = (event) => {
    console.log(
      `Setting element.data.${event.target.id} to ${event.target.value}`
    );
    console.log(event.target);
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

  const setElementType = (event) => {
    // NOTE: For some reason, the MUI selection component generates the event on
    // it's own when clicked. It's not a classic DOM event, so it doesn't have
    // the 'id' property and must be handled differently.
    setNewElement((prevElement) => ({
      ...prevElement,
      data: { ...prevElement.data, type: event.target.value },
    }));
  };

  return (
    <>
      <Grid container spacing={spacing}>
        <TextField
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
            <Select
              id="type"
              value={newElement.data.type}
              onChange={setElementType}
            >
              <MenuItem value={"vessel"}>Vessel</MenuItem>
              <MenuItem value={"station"}>Station</MenuItem>
              <MenuItem value={"stop"}>Stop</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={spacing}>
        <IconTextField
          icon={<Fuel />}
          autoFocus
          margin="dense"
          id="fuel"
          value={newElement.data.fuel}
          label="Fuel (gal.)"
          type="number"
          onChange={onChange}
        />
        <IconTextField
          icon={<Speed />}
          autoFocus
          margin="dense"
          id="speed"
          value={newElement.data.speed}
          label="Speed (Km/h)"
          type="number"
          onChange={onChange}
        />
        <IconTextField
          icon={<Engines />}
          autoFocus
          margin="dense"
          id="engines"
          value={newElement.data.engines}
          label="Engines"
          type="number"
          onChange={onChange}
        />
        <IconTextField
          icon={<Species />}
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
