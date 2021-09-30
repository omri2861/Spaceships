import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import useSnackbar from "../../../Snackbar";

const useStyles = makeStyles((theme) => ({
  selection: {
    minWidth: "120px",
    marginTop: theme.spacing(0.5),
  },
}));

export default function ImageSelection({ value, setValue }) {
  const classes = useStyles();

  const { showError } = useSnackbar;

  const [imageNames, setImageNames] = React.useState([]);

  React.useEffect(
    () =>
      axios
        .get("/api/imageNames")
        .then((res) => setImageNames(res.data))
        .catch(showError),
    []
  );

  const handleChange = (event) => setValue(event.target.value);

  return (
    <FormControl className={classes.selection}>
      <InputLabel>Image</InputLabel>
      <Select id="image" value={value} onChange={handleChange}>
        {imageNames.map((image) => (
          <MenuItem key={image} value={image}>{image}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
