import { makeStyles } from '@material-ui/core/styles';
import bglogin from '../../Assets/bg-login.png'


const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${bglogin})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardLogin: {
    minWidth: "25%",
    transform: "translateX(-40%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formsLogin: {
    display: "flex",
    flexDirection: "column",
    width: 408,
    marginBottom: 48
  },
  loginTitle: {
    color: "#D13201",
    fontSize: 32,
    marginBottom: 88,
  },
  buttonLogin: {
    backgroundColor: "#D13201",
    color: "white",
    borderRadius: "20px",
    width: "126px",
    margin: "0 auto",
  },
  linkcadastrese: {
    marginTop: 48,
    textAlign: "center"
  },

});

export default useStyles;