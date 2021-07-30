import useStyles from './styles';
import './styles.css'
import {
	TextField,
	Button,
	Typography,
	OutlinedInput,
	InputAdornment,
} from '@material-ui/core';
import { useForm } from "react-hook-form";


function CadastroSegundoPasso({ previousPage }) {
	const classes = useStyles();
	const { register } = useForm();

	// const handleChange = (event) => {
	// 	setValues({ ...values, [event.target.name]: event.target.value });
	// };


	const handleSubmit = (e) => {
		e.preventDefault()

	}


	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>
				<form className={classes.formsCadastro} onSubmit={handleSubmit} >

					<Typography className='credentialsStyle'>Taxa de entrega</Typography>
					<TextField
						id="input-taxa-entrega"
						type='text'
						variant="outlined"
						{...register('taxaEntrega', { required: true })} />

					<Typography className='credentialsStyle'>Tempo estimado de entrega</Typography>
					<TextField
						id="input-tempo-entrega"
						type='text'
						variant="outlined"
						{...register('tempoEntregaEmMinutos', { required: true })} />

					<Typography className='credentialsStyle'>Valor mínimo do pedido</Typography>
					<OutlinedInput
						id="input-valor-minimo"
						{...register('valorMinimoPedido', { required: true })}

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
			</div>
		</div>
	)
}

export default CadastroSegundoPasso
