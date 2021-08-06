import './styles.css'
import {
	TextField,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import InputSenha from '../InputSenha/inputSenha'
import profilePic from '../../Assets/pizarria.png'
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import formatCurrency from "format-currency"
import { getCategorias, getProfileDetails, putEditProfile } from '../../Services/functions';

function EditarPerfil({ setOpenModal }) {
	const { token } = useContext(AuthContext);
	const [categorias, setCategorias] = useState([])
	const [details, setDetails] = useState({
		usuario: {}, restaurante: {}
	})
	const [isLoadingDetails, setIsloadingDetails] = useState(true)
	const { register, handleSubmit, getValues, setValue, control, formState: { errors } } = useForm();
	const [baseImage, setBaseImage] = useState("");
	const [file, setFile] = useState('');
	const handleClose = () => {
		setOpenModal(false)
	}

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
			setValue("taxa_entrega", result.restaurante.taxa_entrega)
			setValue("tempo_entrega_minutos", result.restaurante.tempo_entrega_minutos)
			setValue("valor_minimo_pedido", result.restaurante.valor_minimo_pedido)
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
		console.log(values)

		const perfilEditado = {
			nome: values.nome,
			email: values.email,
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

		await putEditProfile(token, perfilEditado);
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
			<TextField
				id="input-edit-email"
				type='email'
				variant="outlined"
				autoComplete="off"
				defaultValue={details.usuario.email}
				{...register('email')}
			/>

			<span>Nome do restaurante</span>
			<TextField
				id="input-edit-nome-restaurante"
				type='text'
				variant="outlined"
				autoComplete="off"
				defaultValue={details.restaurante.nome}
				maxLength={50}
				{...register('restaurante_nome', { maxLength: 50 })}
			/>

			<span>Categoria do restaurante</span>
			<TextField
				id="categoria-restaurante"
				select
				variant="outlined"
				defaultValue={details.restaurante.categoria_id}
				{...register('categoria_id')}
			>
				{categorias.map((categoria) => (
					<MenuItem key={categoria.id} value={categoria.id}>
						{categoria.nome}
					</MenuItem>
				))}
			</TextField>

			<span>Descrição</span>
			<TextField
				id="input-edit-descricao"
				type='text'
				variant="outlined"
				defaultValue={details.restaurante.descricao}
				autoComplete="off"
				helperText='Max. 50 caracteres'
				maxLength={50}
				{...register('descricao', { maxLength: 50 })}
			/>

			<span>Taxa de entrega</span>
			<TextField
				id="input-taxa-entrega"
				type='text'
				variant="outlined"
				defaultValue={currencyFormatter(details.restaurante.taxa_entrega)}
				autoComplete="off"
				{...taxa_entrega}
				onChange={(e) => {
					taxa_entrega.onChange(setCurrencyMask(e))
				}}
			/>

			<span>Tempo estimado de entrega</span>
			<TextField
				id="input-tempo-entrega"
				type='text'
				variant="outlined"
				defaultValue={details.restaurante.tempo_entrega_minutos}
				placeholder="Tempo de entrega em minutos"
				autoComplete="off"
				{...register('tempo_entrega_minutos', { valueAsNumber: true })}
			/>

			<span>Valor mínimo do pedido</span>
			<TextField
				variant="outlined"
				id="input-valor-minimo"
				autoComplete="off"
				defaultValue={currencyFormatter(details.restaurante.valor_minimo_pedido)}
				{...valor_minimo_pedido}
				onChange={(e) => {
					valor_minimo_pedido.onChange(setCurrencyMask(e))
				}}
			/>

			<span className='credentialsStyle font-montserrat'>Senha</span>
			<InputSenha
				error={''}
				id="input_senha_editar_perfil"
				register={() => register('senha')}
			/>

			<span className='credentialsStyle font-montserrat'>Repita sua senha</span>
			<InputSenha
				error={''}
				id="input_repetir_senha_editar_perfil"
				register={() => register('senha_repetida')} />
		</div>
	)

	return (

		<div className='wrapperEditProfile'>
			<div className='font-montserrat containerEditProfile'>
				<h1>Editar Perfil</h1>
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
