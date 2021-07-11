
import Button from "@material-ui/core/Button";
import useDrawer from "./useDrawer";

export default function DrawerButton()
{
    const drawer = useDrawer();

    return <Button onClick={drawer.toggle}>TOGGLE</Button>
}
