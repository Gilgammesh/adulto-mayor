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
  button: {
    marginTop: 40,
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
}));
