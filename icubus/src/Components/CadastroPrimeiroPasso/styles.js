import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    cardCadastro: {
        minHeight: "100vh",
        width: "100%",
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
        marginTop: 40,
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
        minWidth: 408,
        gap: 20,
    },
    linkLogin: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center"
    },

});

export default useStyles;





