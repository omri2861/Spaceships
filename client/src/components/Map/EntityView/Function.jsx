import React from "react";
import { ListItem } from "@material-ui/core";
import axios from "axios";
import useSnackbar from "../../Snackbar";
import { useHistory } from "react-router-dom";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function EntityFunction({ entityId, functionId }) {
  const [funcDef, setFuncDef] = React.useState({ label: "" });

  const { showError } = useSnackbar();
  const history = useHistory();

  // TODO: Get functions name and id as aggregate pipline instead of making the
  // whole round-trip twice
  React.useEffect(() => {
    axios
      .get(`/api/function/${functionId}`)
      .then((res) => setFuncDef(res.data))
      .catch(showError);
  }, [functionId]);

  return (
    <ListItemLink onClick={() => history.push(`/run/${entityId}/${functionId}`)}>
      {funcDef.label}
    </ListItemLink>
  );
}
