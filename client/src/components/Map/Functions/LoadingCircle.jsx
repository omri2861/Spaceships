import { CircularProgress, Grid } from "@material-ui/core";

export default function LoadingCircle({ show }) {
  if (!show) {
    return null;
  }

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
