import { makeStyles } from '@material-ui/core/styles';
import bglogin from '../../Assets/bg-login.png'


const useStyles = makeStyles({
	container: {
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
		boxShadow: " 0px 4px 16px rgba(50, 50, 50, 0.4)",
		borderRadius: 16,
	},
	formsLogin: {
		display: "flex",
		flexDirection: "column",
		width: 408,
		marginBottom: 48
	},
	linkcadastrese: {
		marginTop: 48,
		textAlign: "center"
	},
});

export default useStyles;
