import { makeStyles, } from '@material-ui/core/styles';
import bgcadastro from '../../Assets/bg-cadastro.png'



export const useStyles = makeStyles({
    cadastroTitle: {
        color: "#D13201",
        fontSize: 32,
    },
    containerCadastro: {
        backgroundImage: `url(${bgcadastro})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    formsCadastro: {
        minHeight: "100vh",
        minWidth: 600,
        backgroundColor: "white",
        borderRadius: "0px 0px 88px 0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10
    },
    cardStepper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        gap: 40,
    },

})
