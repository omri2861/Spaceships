import React from "react";
import Button from "@material-ui/core/Button";
import { Snackbar as MuiSnackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackbarContext = React.createContext({
  openSnackbar: (message, severity) => {},
});

function SnackbarProvider(props) {
  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  };

  const openSnackbar = (message, severity) =>
    setSnackbarState({ open: true, message, severity });

  return (
    <>
      <SnackbarContext.Provider value={{ openSnackbar }}>
        {props.children}
      </SnackbarContext.Provider>
      <MuiSnackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </MuiSnackbar>
    </>
  );
}

const useSnackbar = () => React.useContext(SnackbarContext);

export { SnackbarProvider, useSnackbar };
export default useSnackbar;
