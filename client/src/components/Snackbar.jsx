import React from "react";
import { Snackbar as MuiSnackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const maxChars = 100;
const errorPlaceHolder = "Oops, something wen't wrong...";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarContext = React.createContext({
  openSnackbar: (message, severity) => {},
  showError: (error) => {},
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

  const showError = (error) => {
    let message = "";
    if (error === undefined || error === null) {
      message = errorPlaceHolder;
      error = "Trying to log null or undefined error";
    } else if (error.message.length < maxChars) {
      message = error.message;
    } else {
      message = errorPlaceHolder;
    }
    console.error(error);
    openSnackbar(message, "error");
  };

  return (
    <>
      <SnackbarContext.Provider value={{ openSnackbar, showError }}>
        {props.children}
      </SnackbarContext.Provider>
      <MuiSnackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </MuiSnackbar>
    </>
  );
}

const useSnackbar = () => React.useContext(SnackbarContext);

export { SnackbarProvider, useSnackbar };
export default useSnackbar;
