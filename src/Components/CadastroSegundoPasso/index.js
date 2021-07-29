import { useState } from 'react'
import './styles.css'
import useStyles from './styles';
import {
	TextField,
	MenuItem,
	Button,
	Typography,
	Link,
} from '@material-ui/core';





function CadastroSegundoPasso({ onSubmit, previousPage, setPayload }) {
	const classes = useStyles();
	const [values, setValues] = useState({
		nomeRestaurante: '',
		categoriaRestaurante: '',
		descricao: '',
	});

	const currencies = [
		{
			value: 'diversos',
			label: 'Diversos'
		},
		{
			value: 'lanches',
			label: 'Lanches',
		},
		{
			value: 'carnes',
			label: 'Carnes',
		},
		{
			value: 'Massas',
			label: 'massas',
		},
	];

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setPayload(((currentPayload) => ({
			...currentPayload, ...values
		})))
		onSubmit()
	}

	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>
				<form className={classes.formsCadastro} onSubmit={handleSubmit}>
					<Typography className='credentialsStyle' >Nome do restaurante</Typography>
					<TextField
						id="nome-restaurante"
						name="nomeRestaurante"
						value={values.nomeRestaurante}
						className={classes.textField}
						margin="normal"
						variant="outlined"
						onChange={handleChange}
					/>

					<Typography className='credentialsStyle' >Categoria do restaurante</Typography>
					<TextField
						id="categoria-restaurante"
						name="categoriaRestaurante"
						value={values.categoriaRestaurante}
						select
						variant="outlined"
						onChange={handleChange}
					>
						{currencies.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>

					<Typography className='credentialsStyle'>Descrição</Typography>
					<TextField
						id="outlined-margin-normal"
						name="descricao"
						value={values.descricao}
						className={classes.textField}
						helperText="Máx. 50 caracteres"
						margin="normal"
						variant="outlined"
						onChange={handleChange}
					/>

					<div className={classes.containerButtonCadastro}>
						<Button color="secondary" onClick={previousPage}>
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

export default CadastroSegundoPasso
