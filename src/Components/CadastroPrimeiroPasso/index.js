import { useEffect, useState } from 'react';
import useStyles from './styles';
import './styles.css'
import {
	TextField,
	Button,
	Typography,
} from '@material-ui/core';
import InputSenha from '../InputSenha/inputSenha'
import { useForm, Controller } from "react-hook-form";


function CadastroPrimeiroPasso({ nextPage, setPayload, payload }) {
	const classes = useStyles();
	const { register, getValues, control, handleSubmit, watch, setValue, formState: { errors } } = useForm();


	const onSubmit = () => {
		setPayload((currentPayload) => ({ ...currentPayload, ...getValues() }))
		nextPage();

	}

	const getPayload = () => {
		payload.nome && setValue("nome", payload.nome)
		payload.email && setValue("email", payload.email)
		payload.senha && setValue("senha", payload.senha)
		payload.senhaRepetida && setValue("senhaRepetida", payload.senhaRepetida)
	}

	useEffect(() => {
		getPayload()
	}, [])








	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>
				<form className={classes.formsCadastro} onSubmit={handleSubmit(onSubmit)} >
					<Typography className='credentialsStyle font-montserrat'>Nome de usuário</Typography>
					<Controller
						control={control}
						name="nome"
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								id="input-nome"
								type='text'
								variant="outlined"
								autoComplete="off"
								error={Boolean(errors.nome)}
								helperText={errors.nome ? "Campo Obrigatório" : false}
								{...field}
							/>

						)
						}
					/>


					<Typography className='credentialsStyle font-montserrat'>Email</Typography>
					<Controller
						control={control}
						name="email"
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								id="input-email"
								type='email'
								variant="outlined"
								autoComplete="off"
								error={Boolean(errors.email)}
								helperText={errors.email ? "Campo Obrigatório" : false}
								{...field} />
						)
						}
					/>

					<Typography className='credentialsStyle font-montserrat'>Senha</Typography>
					<Controller
						control={control}
						name="senha"
						rules={{ required: true }}
						render={({ field }) => (
							<InputSenha
								id="inputSenhaCadastro"
								error={errors.senha ? "Campo Obrigatório" : false}
								{...field} />
						)
						}
					/>

					<Typography className='credentialsStyle font-montserrat'>Repita sua senha</Typography>
					<Controller
						control={control}
						name="senhaRepetida"
						rules={{ required: true, validate: (value) => value === watch('senha') || "Senhas não conferem" }}
						render={({ field }) => (
							<InputSenha
								error={errors.senhaRepetida ? "Senhas não conferem" : false}
								id="inputSenhaRepetidaCadastro"
								{...field} />
						)
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

			</div>
		</div>
	)
}

export default CadastroPrimeiroPasso
