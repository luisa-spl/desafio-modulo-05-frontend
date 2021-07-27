import { makeStyles } from '@material-ui/core/styles';
import bgcadastro from '../../Assets/bg-cadastro.png'


const useStyles = makeStyles({
    root: {
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
        flexDirection: "column",
        alignItems: "center",
    },
    containerButtonCadastro: {
        display: "flex",
        justifyContent: "center",
        gap: 10,
        marginTop: 65,

    },
    buttonCadastro: {
        backgroundColor: "#D13201",
        color: "white",
        borderRadius: "20px",
        width: "126px",
    },
    formsCadastro: {
        display: "flex",
        flexDirection: "column",
        width: 408,
        marginBottom: 20
    },
    cadastroTitle: {
        color: "#D13201",
        fontSize: 32,
        marginBottom: 50,
    },
    linkLogin: {
        marginTop: 20,
        textAlign: "center"
    },


});

export default useStyles;





