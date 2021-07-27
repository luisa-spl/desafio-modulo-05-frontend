import React from 'react';
import useStyles from './styles';
import {
	Card,
	CardContent,
	TextField,
	Button,
	Typography,
	Backdrop,
	CircularProgress
} from '@material-ui/core';



export default function Login() {
	const classes = useStyles();


	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<CardContent>
					<form className="flex-column">
						<Typography>Login</Typography>
						<TextField id="outlined-basic" label="Email" variant="outlined" />
						<TextField id="outlined-basic" label="Senha" variant="outlined" />
						<Button className={classes.buttonLogin} variant="contained" >
							Entrar
						</Button>
					</form>
					<Typography>Ainda não tem uma conta?</Typography>
				</CardContent>
			</Card>
		</div>

	);
}