import { Divider, Drawer, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column"
  },
  entityViewImage: {
    width: "80%",
    margin: theme.spacing(4),
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
    entity: { data: {}, name: "" },
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
          <img
            src={entityViewState.entity.data.image}
            alt={entityViewState.entity.data.name}
            className={classes.entityViewImage}
          />
          <Divider />
          <Typography variant="h4">
            {entityViewState.entity.data.name}
          </Typography>
          <Typography variant="subtitle1">
            {entityViewState.entity.type}
          </Typography>
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
