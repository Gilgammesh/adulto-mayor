import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  containerLottie: {
    marginTop: "20px",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
      width: "350px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
      width: "320px",
    },
    display: "inline-block",
  },
}));
