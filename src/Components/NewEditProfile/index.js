import React from 'react';
import {
	TextField,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import InputSenha from '../InputSenha/inputSenha'
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import formatCurrency from "format-currency";
import { getCategorias, getProfileDetails, putEditProfile } from '../../Services/functions';
import './styles.css';


function EditarPerfil({ setOpenModal, setImagemPerfil }) {
	const { token } = useContext(AuthContext);
	const [categorias, setCategorias] = useState([])
	const [showEditSuccess, setShowEditSuccess] = useState(false)
	const [details, setDetails] = useState({
		usuario: {}, restaurante: {}
	})
	const [isLoadingDetails, setIsloadingDetails] = useState(true)
	const { register, handleSubmit, getValues, setValue, watch, control, formState: { errors } } = useForm();
	const [baseImage, setBaseImage] = useState("");
	const [file, setFile] = useState('');
	const handleClose = () => {
		setOpenModal(false)
	}
	const [erroSubmit, setErroSubmit] = useState(false)

	const taxa_entrega = register('taxa_entrega', { required: true })
	const valor_minimo_pedido = register('valor_minimo_pedido', { required: true })

	const currencyFormatter = value => {
		const valueNumbers = value.toString().replace(/\D/g, "");
		const money = parseFloat(valueNumbers) / 100;

		return formatCurrency(money, {
			maxFraction: 2,
			locale: "pt-BR",
			format: "%s %v",
			symbol: "R$",
		});
	}

	const setCurrencyMask = (e) => {
		e.target.value = currencyFormatter(e.target.value);

		return e
	}

	const getCategoriasState = async () => {
		const result = await getCategorias()

		if (!result.error) {
			setCategorias(result)
		}
	}

	const getProfileDetailsState = async () => {
		setIsloadingDetails(true)
		const result = await getProfileDetails(token)

		if (!result.error) {
			setDetails(result)
			setValue("nome", result.usuario.nome)
			setValue("email", result.usuario.email)
			setValue("restaurante_nome", result.restaurante.nome)
			setValue("descricao", result.restaurante.descricao)
			setValue("categoria_id", result.restaurante.categoria_id)
			setValue("taxa_entrega", currencyFormatter(result.restaurante.taxa_entrega))
			setValue("tempo_entrega_minutos", result.restaurante.tempo_entrega_minutos)
			setValue("valor_minimo_pedido", currencyFormatter(result.restaurante.valor_minimo_pedido))
		}

		setIsloadingDetails(false)
	}

	useEffect(() => {
		getCategoriasState()
		getProfileDetailsState()
	}, [])


	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	}

	const uploadImage = async (e) => {
		const file = e.target.files[0];
		setFile(file.name);

		const base64 = await convertBase64(file);
		const formatImg = base64.replace("data:", "").replace(/^.+,/, "")

		setBaseImage(formatImg);
	};

	const onSubmit = async () => {
		const getCents = (value) => parseInt(value.toString().replace(/\D/g, ""));
		const values = getValues()

		const perfilEditado = {
			nome: values.nome,
			email: values.email,
			senha: values.senha,
			restaurante: {
				nome: values.restaurante_nome,
				descricao: values.descricao,
				idCategoria: values.categoria_id,
				taxaEntrega: getCents(values.taxa_entrega),
				tempoEntregaEmMinutos: parseInt(values.tempo_entrega_minutos),
				valorMinimoPedido: getCents(values.valor_minimo_pedido),

				nomeImagem: file,
				imagem: baseImage,
			}
		}

		const result = await putEditProfile(token, perfilEditado);

		if (result.error) {
			setErroSubmit(result.error)
		} else {
			setShowEditSuccess(true)
			baseImage && setImagemPerfil(`data:image/jpeg;base64,${baseImage}`)

		}
	}

	const renderInputs = () => (
		<div className='flex-column inputEditProfile'>
			<span>Nome de usuário</span>
			<Controller
				name="nome"
				control={control}
				rules={{ required: true }}
				maxLength={50}
				render={({ field }) => (
					<TextField
						id="input-edit-nome"
						type='text'
						variant="outlined"
						autoComplete="off"
						error={Boolean(errors.nome)}
						helperText={errors.nome ? "Campo Obrigatório" : false}
						{...field}
					/>
				)}
			/>

			<span>Email</span>
			<Controller
				name="email"
				control={control}
				rules={{ required: true }}
				maxLength={50}
				render={({ field }) => (
					<TextField
						id="input-edit-email"
						type='email'
						variant="outlined"
						autoComplete="off"
						error={Boolean(errors.email)}
						helperText={errors.email ? "Campo Obrigatório" : false}
						{...field}

					/>
				)}
			/>

			<span>Nome do restaurante</span>
			<Controller
				name="restaurante_nome"
				control={control}
				rules={{ required: true }}
				maxLength={50}
				render={({ field }) => (
					<TextField
						id="input-edit-nome-restaurante"
						type='text'
						variant="outlined"
						autoComplete="off"
						maxLength={50}
						error={Boolean(errors.restaurante_nome)}
						helperText={errors.restaurante_nome ? "Campo Obrigatório" : false}
						{...field}

					/>
				)}
			/>

			<span>Categoria do restaurante</span>
			<Controller
				name="categoria_id"
				control={control}
				rules={{ required: true }}
				maxLength={50}
				render={({ field }) => (
					<TextField
						id="categoria-restaurante"
						select
						variant="outlined"
						error={Boolean(errors.categoria_id)}
						helperText={errors.categoria_id ? "Campo Obrigatório" : false}
						{...field}
					>
						{categorias.map((categoria) => (
							<MenuItem key={categoria.id} value={categoria.id}>
								{categoria.nome}
							</MenuItem>
						))}
					</TextField>
				)}
			/>

			<span>Descrição</span>
			<Controller
				name="descricao"
				control={control}
				maxLength={100}
				render={({ field }) => (
					<TextField
						id="input-edit-descricao"
						type='text'
						variant="outlined"
						autoComplete="off"
						helperText='Max. 50 caracteres'
						{...field}
					/>
				)}
			/>

			<span>Taxa de entrega</span>
			<Controller
				name="taxa_entrega"
				control={control}
				rules={{ required: true }}
				onChange={(e) => {
					taxa_entrega.onChange(setCurrencyMask(e))
				}}
				render={({ field }) => (
					<TextField
						id="input-taxa-entrega"
						type='text'
						variant="outlined"
						autoComplete="off"
						error={Boolean(errors.taxa_entrega)}
						helperText={errors.taxa_entrega ? "Campo Obrigatório" : false}
						{...field}
					/>
				)}
			/>

			<span>Tempo estimado de entrega</span>
			<Controller
				name="tempo_entrega_minutos"
				control={control}
				rules={{ required: true, valueAsNumber: true }}
				render={({ field }) => (
					<TextField
						id="input-tempo-entrega"
						type='text'
						variant="outlined"
						placeholder="Tempo de entrega em minutos"
						error={Boolean(errors.tempo_entrega_minutos)}
						helperText={errors.tempo_entrega_minutos ? "Campo Obrigatório" : false}
						autoComplete="off"
						{...field}
					/>
				)}
			/>

			<span>Valor mínimo do pedido</span>
			<Controller
				name="valor_minimo_pedido"
				control={control}
				rules={{ required: true }}
				onChange={(e) => {
					valor_minimo_pedido.onChange(setCurrencyMask(e))
				}}
				render={({ field }) => (
					<TextField
						variant="outlined"
						type='text'
						id="input-valor-minimo"
						autoComplete="off"
						error={Boolean(errors.valor_minimo_pedido)}
						helperText={errors.valor_minimo_pedido ? "Campo Obrigatório" : false}
						{...field}
					/>
				)}
			/>

			<span className='credentialsStyle font-montserrat'>Senha</span>
			<Controller
				name="senha"
				control={control}
				render={({ field }) => (
					<InputSenha
						error={''}
						id="input_senha_editar_perfil"
						{...field}
					/>
				)}
			/>

			<span className='credentialsStyle font-montserrat'>Repita sua senha</span>
			<Controller
				name="senha_repetida"
				control={control}
				rules={{ required: Boolean(watch('senha')) }}
				render={({ field }) => (
					<InputSenha
						id="input_repetir_senha_editar_perfil"
						error={errors.senha_repetida ? "Campo Obrigatório" : false}
						{...field}
					/>
				)}
			/>
		</div>
	)

	return (

		<div className='wrapperEditProfile'>
			<div className='font-montserrat containerEditProfile'>
				<div className='headerEditPerfil'>
					<h1>Editar Perfil</h1>
					{showEditSuccess && <Alert onClose={handleClose}>Cadastro editado com sucesso!</Alert>}
					{erroSubmit && <Alert severity="error" onClose={handleClose}>{erroSubmit}</Alert>}

				</div>
				<form className='formsEditProfile' id='forms-edit-profile' onSubmit={handleSubmit(onSubmit)} method='post'>
					{isLoadingDetails ? (
						<div className='loadingContainer'>
							<CircularProgress />
						</div>
					) : renderInputs()}
					<div className='uploadDivEditProfile'>
						<label htmlFor="img-profile" className='labelImageProfile'>
							Clique ou arraste para adicionar uma imagem</label>
						<input
							className='input-img'
							id='img-profile'
							type='file'
							accept='.jpg,.jpeg,.png'
							onChange={(e) => { uploadImage(e) }}
						/>
						<img src={baseImage ? `data:image/jpeg;base64,${baseImage}` : details.restaurante.imagem} className='profileImage' alt="" />
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
						form='forms-edit-profile'
					>
						Salvar edição
					</button>
				</div>
			</div>
		</div >
	)
}

export default EditarPerfil
