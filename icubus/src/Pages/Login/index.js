import React from 'react';
import useStyles from './styles';
import { useState } from 'react';
import {
	Card,
	CardContent,
	TextField,
	Button,
	Typography,
	Backdrop,
	CircularProgress,
	Link,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';




export default function Login() {
	const classes = useStyles();
	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
		console.log(values)
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};


	return (
		<div className={classes.root}>
			<Card className={classes.cardLogin}>
				<CardContent>
					<Typography className={classes.loginTitle}>Login</Typography>
					<form className={classes.formsLogin}>
						<div className={classes.formsLogin}>
							<Typography className={classes.credentialsStyle}>E-mail</Typography>
							<OutlinedInput
								id="input-email"
								type='email'
								value={values.email}
								onChange={handleChange('email')}
							/>
						</div>
						<div className={classes.formsLogin}>
							<Typography className={classes.credentialsStyle}>Senha</Typography>
							<OutlinedInput
								id="input-password"
								type={values.showPassword ? 'text' : 'password'}
								value={values.password}
								onChange={handleChange('password')}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}

							/>
						</div>
						<Button className={classes.buttonLogin} variant="contained" >
							Entrar
						</Button>
					</form>
					<div className={classes.linkcadastrese}>
						<Typography>Ainda não tem uma conta? <Link href="/cadastro" >Cadastre-se </Link> </Typography>

					</div>
				</CardContent>
			</Card>
		</div>

	);
}