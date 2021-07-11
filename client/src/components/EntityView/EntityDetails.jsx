import { Divider, makeStyles, Typography } from "@material-ui/core";

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
}));

const ignoredAttributes = ["name", "image"];

export default function EntityDetails({ entity }) {
  const classes = useStyles();

  const getAttributes = (entity) => {
    let res = [];
    for (const [attr, value] of Object.entries(entity.data)) {
      if (!ignoredAttributes.includes(attr)) {
        res.push(
          <li>
            {attr}: {value}
          </li>
        );
      }
    }
    return res;
  };

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
      <ul>{getAttributes(entity)}</ul>
    </div>
  );
}
