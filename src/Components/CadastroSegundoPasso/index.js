import './styles.css'
import useStyles from './styles';
import {
	TextField,
	MenuItem,
	Button,
	Typography,
} from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from 'react';






function CadastroSegundoPasso({ nextPage, previousPage, setPayload, payload }) {
	const classes = useStyles();
	const { register, getValues, handleSubmit, control, setValue, formState: { errors } } = useForm();
	const [categorias, setCategorias] = useState([])


	async function getCategorias() {
		await fetch('https://icubus.herokuapp.com/categorias')
			.then(async (res) => {
				const data = await res.json()
				setCategorias(data)
			})
	}


	const getPayload = () => {
		payload.nomeRestaurante && setValue("nomeRestaurante", payload.nomeRestaurante)
		payload.idCategoria && setValue("idCategoria", payload.idCategoria)
		payload.descricao && setValue("descricao", payload.descricao)
	}



	useEffect(() => {
		getCategorias()
		getPayload()
	}, [])


	const onSubmit = () => {
		setPayload((currentPayload) => ({ ...currentPayload, ...getValues() }));
		nextPage();
	}

	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>
				<form className={classes.formsCadastro} onSubmit={handleSubmit(onSubmit)}>
					<Typography className='credentialsStyle'>Nome do restaurante</Typography>
					<Controller
						control={control}
						name="nomeRestaurante"
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								id="nome-restaurante"
								className={classes.textField}
								margin="normal"
								variant="outlined"
								autoComplete="off"
								error={Boolean(errors.nomeRestaurante)}
								helperText={errors.nomeRestaurante ? "Campo Obrigatório" : false}
								{...field}
							/>
						)
						}
					/>

					<Typography className='credentialsStyle' >Categoria do restaurante</Typography>
					<Controller
						control={control}
						name="idCategoria"
						rules={{ required: true }}
						render={({ field }) => {
							return (
								<TextField
									id="categoria-restaurante"
									select
									variant="outlined"
									error={Boolean(errors.idCategoria)}
									helperText={errors.idCategoria ? "Campo Obrigatório" : false}
									SelectProps={{
										native: true,
									}}
									{...field}
								>
									{categorias.map((categoria) => (
										<option key={categoria.id} value={categoria.id}>
											{categoria.nome}
										</option>
									))}
								</TextField>
							)
						}}
					/>

					<Typography className='credentialsStyle'>Descrição</Typography>
					<Controller
						control={control}
						name="descricao"
						render={({ field }) => (
							<TextField
								id="outlined-margin-normal"
								className={classes.textField}
								margin="normal"
								variant="outlined"
								autoComplete="off"
								placeholder="Máx. 100 caracteres"
								error={Boolean(errors.descricao)}
								helperText={errors.descricao ? "Campo Obrigatório" : false}
								{...field}
							/>
						)
						}
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

			</div>
		</div >
	)
}

export default CadastroSegundoPasso
