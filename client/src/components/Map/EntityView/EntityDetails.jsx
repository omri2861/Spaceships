import {
  Box,
  Divider,
  List,
  makeStyles,
  Typography,
  ListItem,
} from "@material-ui/core";
import { Fuel, Speed, Engines, Species } from "../../Icons";
import EntityFunction from "./Function";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
  },
  entityViewImage: {
    width: "80%",
    margin: theme.spacing(5),
  },
  header: {
    margin: theme.spacing(1),
  },
  fieldList: {
    display: "grid",
    gridTemplateColumns: "auto auto",
  },
  field: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    margin: theme.spacing(1),
  },
  fieldIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));

function Field({ icon, value }) {
  const classes = useStyles();

  return (
    <div className={classes.field}>
      <Box className={classes.fieldIcon}>{icon}</Box>
      {value}
    </div>
  );
}

export default function EntityDetails({ entity }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src={entity.image}
        alt={entity.name}
        className={classes.entityViewImage}
      />
      <Divider />
      <Box className={classes.header}>
        <Typography variant="h4">{entity.name}</Typography>
        <Typography variant="subtitle1">{entity.type}</Typography>
      </Box>
      <div className={classes.fieldList}>
        <Field icon={<Fuel />} value={`${entity.fuel} gal.`} />
        <Field icon={<Speed />} value={`${entity.speed} Km/h`} />
        <Field icon={<Engines />} value={`${entity.engines}`} />
        <Field icon={<Species />} value={`${entity.species}`} />
      </div>
      <Divider />
      <List>
        {entity.functions.map((func) => (
          <EntityFunction key={func} functionId={func} />
        ))}
      </List>
    </div>
  );
}
