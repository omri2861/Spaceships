import { Drawer } from "@material-ui/core";
import React from "react";

const DrawerContext = React.createContext({ isOpen: false, toggle: () => {} });

function DrawerProvider({ children }) {
  const [drawerState, setDrawerState] = React.useState({ isOpen: false });

  const toggle = () =>
    setDrawerState((prevState) => ({
      ...prevState,
      isOpen: true,
    }));

  return (
    <>
      <Drawer anchor="right" open={drawerState.isOpen}>
        This is something I wrote
        <div style={{ width: "250px" }} />
      </Drawer>
      <DrawerContext.Provider value={{ ...drawerState, toggle: toggle }}>
        {children}
      </DrawerContext.Provider>
    </>
  );
}

const useDrawer = () => React.useContext(DrawerContext);

export { DrawerProvider, useDrawer };

export default useDrawer;
