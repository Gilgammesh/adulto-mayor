import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "rgba(102,150,186,0.6)",
  },
  container: {
    marginTop: "64px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "56px",
    },
    marginBottom: "10px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  grid: {
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: "column",
    alignItems: "center",
  },
}));
