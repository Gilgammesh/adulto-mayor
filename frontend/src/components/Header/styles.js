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
    color: "#333",
    fontWeight: "500",
    fontSize: 20
  },
  toolBarPrimary: {
    background: "linear-gradient(45deg, #eaeaea 30%, #eeeeee 90%)",
  },  
}));
