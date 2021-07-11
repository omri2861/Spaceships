import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import {
  LocalGasStation,
  Speed,
  Flare,
  AccountCircle,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  entityViewImage: {
    width: "80%",
    margin: theme.spacing(4),
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
        src={entity.data.image}
        alt={entity.data.name}
        className={classes.entityViewImage}
      />
      <Divider />
      <Typography variant="h4">{entity.data.name}</Typography>
      <Typography variant="subtitle1">{entity.type}</Typography>
      <div className={classes.fieldList}>
        <Field icon={<LocalGasStation />} value={`${entity.data.fuel} gal.`} />
        <Field icon={<Speed />} value={`${entity.data.speed} Km/h`} />
        <Field icon={<Flare />} value={`${entity.data.engines}`} />
        <Field icon={<AccountCircle />} value={`${entity.data.species}`} />
      </div>
    </div>
  );
}
