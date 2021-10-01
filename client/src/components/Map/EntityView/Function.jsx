import React from "react";
import { ListItem } from "@material-ui/core";
import axios from "axios";
import useSnackbar from "../../Snackbar";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function EntityFunction({ functionId }) {
  const [funcDef, setFuncDef] = React.useState({ label: "" });

  const { showError } = useSnackbar();

  React.useEffect(() => {
    axios
      .get(`/api/function/${functionId}`)
      .then((res) => setFuncDef(res.data))
      .catch(showError);
  }, [functionId]);

  return <ListItemLink>{funcDef.label}</ListItemLink>;
}
