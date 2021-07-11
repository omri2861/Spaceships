import { Drawer, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "250px",
    padding: theme.spacing(1)
  }
}));

const DrawerContext = React.createContext({ isOpen: false, showEntity: (entity) => {} });

function DrawerProvider({ children }) {
  const classes = useStyles();

  const [drawerState, setDrawerState] = React.useState({ isOpen: false, entity: {} });

  const showEntity = (entity) =>
  // TODO: Maybe optimize with useCallback?
    setDrawerState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      entity: entity
    }));

  const close = () =>
    setDrawerState((prevState) => ({ ...prevState, isOpen: false }));

  return (
    <>
      <Drawer anchor="right" open={drawerState.isOpen} onClose={close}>
        <div className={classes.root}>
          <Typography variant="h4">{drawerState.entity.name}</Typography>
        </div>
      </Drawer>
      <DrawerContext.Provider value={{ ...drawerState, showEntity }}>
        {children}
      </DrawerContext.Provider>
    </>
  );
}

const useDrawer = () => React.useContext(DrawerContext);

export { DrawerProvider, useDrawer };

export default useDrawer;
