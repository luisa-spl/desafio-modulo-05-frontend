import useStyles from './styles';
import './styles.css'
import {
	TextField,
	Button,
	Typography,

} from '@material-ui/core';
import InputSenha from '../InputSenha/inputSenha'
import { useForm } from "react-hook-form";





function CadastroPrimeiroPasso({ onSubmit }) {
	const classes = useStyles();
	const { register } = useForm();

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit()
	}

	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>
				<form className={classes.formsCadastro} onSubmit={handleSubmit} >
					<Typography className='credentialsStyle font-montserrat'>Nome de usuário</Typography>
					<TextField
						id="input-nome"
						type='text'
						variant="outlined"
						{...register('nome', { required: true })} />

					<Typography className='credentialsStyle font-montserrat'>Email</Typography>
					<TextField
						id="input-email"
						type='email'
						variant="outlined"
						{...register('email', { required: true })} />

					<Typography className='credentialsStyle font-montserrat'>Senha</Typography>
					<InputSenha
						register={() => register('senha', { required: true })}
						id="inputSenhaCadastro" />

					<Typography className='credentialsStyle font-montserrat'>Repita sua senha</Typography>
					<InputSenha
						register={() => register('senhaRepetida', { required: true })}
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
