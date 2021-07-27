import { makeStyles } from '@material-ui/core/styles';
import bgcadastro from '../../Assets/bg-cadastro.png'


const useStyles = makeStyles({
    cadastroTitle: {
        color: "#D13201",
        fontSize: 32,
        marginTop: 20
    },
    containerCadastro: {
        backgroundImage: `url(${bgcadastro})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    cardCadastro: {
        minHeight: "100vh",
        width: "40%",
        backgroundColor: "white",
        borderRadius: "0px 0px 88px 0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    stepper: {
        padding: 15,
        gap: 8,
        marginTop: 20
    }
})


export default useStyles;
