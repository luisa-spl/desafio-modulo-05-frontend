import useStyles from './styles';
import './styles.css'
import {
	TextField,
	CircularProgress,


} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import UploadIcon from '../../Assets/upload-icon.svg';

import InputSenha from '../InputSenha/inputSenha'
import { useForm } from "react-hook-form";
import { useState } from 'react';



function EditProfile({ setOpen }) {

	const classes = useStyles();
	const { register, getValues, handleSubmit, watch, formState: { errors } } = useForm();
	const [erro, setErro] = useState('');
	const [carregando, setCarregando] = useState(false);


	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<div className='font-montserrat containerEditProfile'>
				<h1>Editar Perfil</h1>
				<form className='formsEditProfile'>
					<div className='flex-column inputEditProfile'>
						<span>Nome de usuário</span>
						<TextField
							id="input-edit-nome"
							type='text'
							variant="outlined"
							autoComplete="off"
							error={Boolean(errors.nome)}
							helperText={errors.nome ? "Campo Obrigatório" : false}
							{...register('nome')} />

						<span>Email</span>
						<TextField
							id="input-edit-email"
							type='text'
							variant="outlined"
							autoComplete="off"
							{...register('email')} />

						<span>Nome do restaurante</span>
						<TextField
							id="input-edit-nome-restaurante"
							type='text'
							variant="outlined"
							autoComplete="off"
							{...register('nomeRestaurante')} />

						<span>Descrição</span>
						<TextField
							id="input-edit-descricao"
							type='text'
							variant="outlined"
							autoComplete="off"
							helperText='Max. 50 caracteres'
							{...register('descricao')} />

						<span>Taxa de entrega</span>
						<TextField
							id="input-edit-taxaEntrega"
							type='text'
							variant="outlined"
							autoComplete="off"
							{...register('taxa_entrega')} />

						<span>Tempo estimado de entrega</span>
						<TextField
							id="input-edit-tempoEntrega"
							type='text'
							variant="outlined"
							autoComplete="off"
							{...register('tempo_entrega_minutos')} />

						<span>Valor mínimo do pedido</span>
						<TextField
							id="input-edit-valor_minimo_pedido"
							type='text'
							variant="outlined"
							autoComplete="off"
							{...register('valor_minimo_pedido')} />


						<span className='credentialsStyle font-montserrat'>Senha</span>
						<InputSenha
							register={() => register('senha')}
							id="input_senha_editar_perfil"
							error={Boolean(errors.senha)}
							helperText={errors.senha ? "Campo Obrigatório" : false} />

						<span className='credentialsStyle font-montserrat'>Repita sua senha</span>
						<InputSenha
							error={errors.senhaRepetida ? errors.senhaRepetida.message : false}
							register={() => register('senhaRepetida', {
								required: true,
								validate: (value) => value === watch('senha') || "Senhas não conferem"
							})}
							id="input_senha_repetida_editar_perfil" />
					</div>


					<div className='profilePicture'>
						<img src={UploadIcon} alt='imagem' />
					</div>
				</form>
				<div className='flex-row actionButtons '>
					<button
						className='transparent-btn font-montserrat font-color-orange font-bold'
						onClick={handleClose}
					>
						Cancelar
					</button>
					<button
						className='btn-orange-small font-montserrat font-color-white'
						type='submit'
					>
						Salvar edição
					</button>

					{carregando && <CircularProgress />}
					{erro && <Alert severity="error">{erro}</Alert>}
				</div>
			</div>
		</div>
	)
}

export default EditProfile
