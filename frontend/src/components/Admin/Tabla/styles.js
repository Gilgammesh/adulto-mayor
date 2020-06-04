import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    width: "100%",
    padding: theme.spacing(2)
  },
  container: {
    padding: theme.spacing(2)
  }
}));
