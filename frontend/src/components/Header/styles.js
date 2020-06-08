import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "transparent",
  },
  imgLogo: {
    maxWidth: "45px",
    maxHeight: "45px",
  },
  imgGrsm: {
    maxWidth: "180px",
  },
  title: {
    flexGrow: 1,
    marginLeft: "15px",
    color: "#2b6e9b",
    fontWeight: "500",
    fontSize: 20,    
    [theme.breakpoints.down("sm")]: {
      marginRight: 16
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  toolBarPrimary: {
    background: "linear-gradient(45deg, #eaeaea 30%, #eeeeee 90%)",
  },
  button: {
    marginLeft: 30,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      maxWidth: 50
    },
  },
}));
