import { useState } from 'react'

import useStyles from './styles';
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




function CadastroSegundoPasso() {
	const classes = useStyles();

	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
		showRepeatPassword: false,
		amount: '',
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
		console.log(values)
	};



	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>

				<form action="" className={classes.formsCadastro} >

					<Typography className={classes.credentialsStyle}>Taxa de entrega</Typography>
					<OutlinedInput id="input-taxa-entrega" type='text' value={""} onChange={""} />

					<Typography className={classes.credentialsStyle}>Tempo estimado de entrega</Typography>
					<OutlinedInput id="input-tempo-entrega" type='text' value={""} onChange={""} />

					<Typography className={classes.credentialsStyle}>Valor mínimo do pedido</Typography>
					<OutlinedInput
						id="input-valor-minimo"
						value={values.amount}
						onChange={handleChange('amount')}
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
					/>


					<div className={classes.containerButtonCadastro}>
						<Button className={classes.buttonCadastro}>
							Anterior
						</Button>
						<Button className={classes.buttonCadastro} variant="contained" >
							Próximo
						</Button>
					</div>
				</form>
				<div className={classes.linkLogin}>
					<Typography>Já tem uma conta? <Link href="/" >Login </Link> </Typography>

				</div>
			</div>
		</div>
	)
}

export default CadastroSegundoPasso
