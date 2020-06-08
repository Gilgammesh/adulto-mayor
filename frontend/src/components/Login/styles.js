import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/img/login_portada.png";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage: `url(${bg})`,
    width: "100vw",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  paper: {
    height: "98vh",
    backgroundColor: "transparent",
    flexDirection: "column",
    display: "flex",
    margin: 5,
  },
  box1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 9,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imgLogo: {
    maxWidth: "100px",
    maxHeight: "100px",
  },
  textSistema: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: "#2b6e9b",
  },
  box2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 11,
    backgroundColor: "rgba(102,150,186,0.8)",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  box2_: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textLogin: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#eeeeee",
    marginTop: 40,
    marginBottom: 20,
  },
  form: {
    marginTop: 10,
    marginBottom: 10,
  },
  inputlabel: {
    color: "#ffffff",
  },
  input: {
    color: "#eeeeee",
  },
  icon: {
    color: "#ffffff",
  },
  button: {
    marginTop: 40,
  },
  progress: {
    color: "#ffffff",
  },
}));
