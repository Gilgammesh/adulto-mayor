import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";

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
  containerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: teal["100"],
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: theme.spacing(2),
  },
  containerHeaderTit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerHeaderBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
    color: "#19425e",
    fontWeight: "500",
    fontSize: 20,
    marginLeft: 10
  },
  icontitle: {
    flexGrow: 1,
    color: "#19425e",
    fontWeight: "500",
    fontSize: 24,
  },
  containerForm: {
    padding: theme.spacing(2),
  },
  form: {
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 10,
  },
  containerInput: {
    width: "calc(100% - 35px)",
  },
  containerInput_: {
    width: "100%",
  },
  inputlabel: {
    color: "#406987",
  },
  input: {
    color: "#333",
    width: "100%",
  },
  icon: {
    color: "rgba(64,105,135,0.9)",
  },
  icon_: {
    color: "rgba(239,83,80,0.9)",
  },
  progress: {
    color: "#ffffff",
  },
  formControl: {
    marginLeft: 14,
  },
  formLabel: {
    color: "#3f51b5",
    fontSize: 12,
  },
  formControllabel: {
    marginTop: 3,
    color: "rgba(0,0,0,0.6)",
  },
  formControlCheck: {
    padding: 6,
  },
  containerMap: {
    display: "flex",
    width: "100%",
    margin: "0 auto",
    height: "600px",
  },
  map: {
    flex: "1",
  },
  button: {
    marginLeft: 10,
  },
}));
