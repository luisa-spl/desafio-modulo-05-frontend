import { useState } from 'react'
import useStyles from './styles';
import './styles.css'
import {
	TextField,
	Button,
	Typography,
	Link,
	InputAdornment,
	IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';




function CadastroPrimeiroPasso({ onSubmit, setPayload }) {
	const classes = useStyles();

	const [values, setValues] = useState({
		nome: '',
		email: '',
		password: '',
		showPassword: false,
		showRepeatPassword: false,
	});

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleClickShowRepeatPassword = () => {
		setValues({ ...values, showRepeatPassword: !values.showRepeatPassword });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit()
		setPayload((currentPayload) => ({
			...currentPayload, ...values
		}))
		console.log(values)
	}


	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>
				<form className={classes.formsCadastro} onSubmit={handleSubmit} >
					<Typography className='credentialsStyle font-montserrat'>Nome de usuário</Typography>
					<TextField id="input-nome" type='text' name="nome" value={values.nome} onChange={handleChange} variant="outlined" />

					<Typography className='credentialsStyle font-montserrat'>Email</Typography>
					<TextField id="input-email" type='email' name="email" value={values.email} onChange={handleChange} variant="outlined" />

					<Typography className='credentialsStyle font-montserrat'>Senha</Typography>
					<TextField
						id="input-password"
						type={values.showPassword ? 'text' : 'password'}
						value={values.password}
						name="password"
						onChange={handleChange}
						variant="outlined"
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end"
								>
									{values.showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>

					<Typography className='credentialsStyle font-montserrat'>Repita sua senha</Typography>
					<TextField
						id="input-password"
						type={values.showRepeatPassword ? 'text' : 'password'}
						value={values.repeatPasswordpassword}
						onChange={handleChange}
						variant="outlined"
						name="repeatPassword"
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowRepeatPassword}

									edge="end"
								>
									{values.showRepeatPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<div className={classes.containerButtonCadastro}>
						<Button disabled>
							Anterior
						</Button>
						<Button className={classes.buttonCadastro} variant="contained" type="submit">
							Próximo
						</Button>
					</div>
				</form>
				<div className={classes.linkLogin}>
					<Typography>Já tem uma conta? <Link href="/cadastro" >Login </Link> </Typography>

				</div>
			</div>
		</div>
	)
}

export default CadastroPrimeiroPasso
