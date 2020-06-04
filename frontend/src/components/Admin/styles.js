import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "87vh",
    width: "100vw",
    background: "#eeeeee",
  },
  container: {
    marginTop: "80px",
    marginBottom: "10px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  grid: {
    paddingTop: "8px",
    //display: "flex",
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
  },
}));
