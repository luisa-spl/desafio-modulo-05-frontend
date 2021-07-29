import { useState, useEffect } from 'react'
import useStyles from './styles';
import './styles.css'
import { useHistory } from "react-router-dom";
import {
	TextField,
	Button,
	Typography,
	Link,
	OutlinedInput,
	InputAdornment,

} from '@material-ui/core';


function CadastroSegundoPasso({ previousPage, payload }) {
	const classes = useStyles();
	const history = useHistory();



	// useEffect(() => {
	// 	console.log(payload)
	// }, [payload])

	const [values, setValues] = useState({
		taxaEntrega: '',
		tempoEntregaEmMinutos: '',
		valorMinimoPedido: '',
	});

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};


	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(payload)
		//history.push("/");
	}


	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>
				<form className={classes.formsCadastro} onSubmit={handleSubmit} >

					<Typography className='credentialsStyle'>Taxa de entrega</Typography>
					<TextField id="input-taxa-entrega" type='text' name="taxaEntrega" value={values.taxaEntrega} onChange={handleChange} variant="outlined" />

					<Typography className='credentialsStyle'>Tempo estimado de entrega</Typography>
					<TextField id="input-tempo-entrega" type='text' name="tempoEntregaEmMinutos" value={values.tempoEntregaEmMinutos} onChange={handleChange} variant="outlined" />

					<Typography className='credentialsStyle'>Valor mínimo do pedido</Typography>
					<OutlinedInput
						id="input-valor-minimo"
						value={values.valorMinimoPedido}
						onChange={handleChange}
						name="valorMinimoPedido"
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
					/>


					<div className={classes.containerButtonCadastro}>
						<Button color="secondary" onClick={previousPage}>
							Anterior
						</Button>
						<Button className={classes.buttonCadastro} variant="contained" type="submit" >
							Criar conta
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
