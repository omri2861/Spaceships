import { Drawer } from "@material-ui/core";
import React from "react";
import EntityDetails from "./EntityDetails";

const EntityViewContext = React.createContext({
  isOpen: false,
  showEntity: (entity) => {},
});

function EntityViewProvider({ children }) {
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
        <EntityDetails entity={entityViewState.entity} />
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
