import React from 'react';
import useStyles from './styles';
import './style.css'
import { useState, useContext } from 'react';
import InputSenha from '../../Components/InputSenha/inputSenha';
import {
	Card,
	CardContent,
	TextField,
	Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';



export default function Login() {
	const { setToken } = useContext(AuthContext)
	const classes = useStyles();
	const history = useHistory();
	const [error, setError] = useState(false)
	const { register, handleSubmit } = useForm()


	async function onSubmit(data) {
		console.log(data)
		setError(false);

		fetch('https://icubus.herokuapp.com/login', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json'
			}
		}).then(async (res) => {
			const data = await res.json()

			if (res.status > 299) {
				console.log(data)
				setError(data)
			} else {
				setToken(data.token)
				history.push('/produtos')
			}
		});
	}


	return (
		<div className={classes.container}>
			<Card className={classes.cardLogin}>
				<CardContent>
					<h1 className='loginTitle font-baloo'>Login</h1>
					{Boolean(error) && (
						<Alert severity="error">
							{error}
						</Alert>
					)}
					<form className={classes.formsLogin} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
						<div className={classes.formsLogin}>
							<Typography className='placeholderLogin font-montserrat'>E-mail</Typography>
							<TextField
								id="input-email"
								type='email'
								variant="outlined"
								{...register('email', { required: true })}
							/>
						</div>
						<div className={classes.formsLogin}>
							<Typography className='placeholderLogin font-montserrat'>Senha</Typography>
							<InputSenha
								register={() => register('senha', { required: true })}
								id="inputSenhaLogin" />
						</div>
						<button className="buttonLogin" type="submit">
							Entrar
						</button>
					</form>
					<div className={classes.linkcadastrese}>
						<Typography>Ainda não tem uma conta? <a href="/cadastro" >Cadastre-se </a> </Typography>

					</div>
				</CardContent>
			</Card>
		</div>

	);
}