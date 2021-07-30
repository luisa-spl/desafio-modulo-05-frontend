import useStyles from './styles';
import './styles.css'
import {
	TextField,
	Button,
	Typography,

} from '@material-ui/core';
import InputSenha from '../InputSenha/inputSenha'
import { useForm } from "react-hook-form";


function CadastroPrimeiroPasso({ nextPage, setPayload }) {
	const classes = useStyles();
	const { register, getValues, handleSubmit, watch, formState: { errors } } = useForm();

	const onSubmit = () => {
		setPayload((currentPayload) => ({ ...currentPayload, ...getValues() }))
		nextPage();
	}

	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>
				<form className={classes.formsCadastro} onSubmit={handleSubmit(onSubmit)} >
					<Typography className='credentialsStyle font-montserrat'>Nome de usuário</Typography>
					<TextField
						id="input-nome"
						type='text'
						variant="outlined"
						{...register('nome', { required: true })} />

					<Typography className='credentialsStyle font-montserrat'>Email</Typography>
					<TextField
						error={Boolean(errors.email)}
						id="input-email"
						type='email'
						variant="outlined"
						helperText={errors.email ? "Campo Obrigatório" : false}
						{...register('email', {
							required: true,
						})} />

					<Typography className='credentialsStyle font-montserrat'>Senha</Typography>
					<InputSenha
						register={() => register('senha', { required: true })}
						id="inputSenhaCadastro" />

					<Typography className='credentialsStyle font-montserrat'>Repita sua senha</Typography>
					<InputSenha
						error={errors.senhaRepetida ? errors.senhaRepetida.message : false}
						register={() => register('senhaRepetida', {
							required: true,
							validate: (value) => value === watch('senha') || "Senhas não conferem"
						})}
						id="inputSenhaRepetidaCadastro" />

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
