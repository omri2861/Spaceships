import { Drawer, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "250px",
    padding: theme.spacing(1),
  },
}));

const EntityViewContext = React.createContext({
  isOpen: false,
  showEntity: (entity) => {},
});

function EntityViewProvider({ children }) {
  const classes = useStyles();

  const [entityViewState, setEntitiyViewState] = React.useState({
    isOpen: false,
    entity: {},
  });

  const showEntity = (entity) =>
    // TODO: Maybe optimize with useCallback?
    setEntitiyViewState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      entity: entity,
    }));

  const close = () =>
    setEntitiyViewState((prevState) => ({ ...prevState, isOpen: false }));

  return (
    <>
      <Drawer anchor="right" open={entityViewState.isOpen} onClose={close}>
        <div className={classes.root}>
          <Typography variant="h4">{entityViewState.entity.name}</Typography>
        </div>
      </Drawer>
      <EntityViewContext.Provider value={{ ...entityViewState, showEntity }}>
        {children}
      </EntityViewContext.Provider>
    </>
  );
}

const useEntityView = () => React.useContext(EntityViewContext);

export { EntityViewProvider, useEntityView };

export default useEntityView;
