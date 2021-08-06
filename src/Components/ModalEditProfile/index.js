import './styles.css'
import {
	TextField,
	MenuItem,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import InputSenha from '../InputSenha/inputSenha';
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import formatCurrency from "format-currency"




export default function EditProfile({ setOpenModal }) {
	const { token } = useContext(AuthContext);
	const { register, getValues, handleSubmit, watch, setValue, formState: { errors } } = useForm();
	const [error, setError] = useState('');
	const [isLoadingDetails, setIsLoadingDetails] = useState(true);
	const [baseImage, setBaseImage] = useState("");
	const [details, setDetails] = useState({
		usuario: {},
		restaurante: {}
	})
	const history = useHistory();
	const [showRegisterSuccess, setShowRegisterSuccess] = useState()
	const [detailsSuccess, setDetailsSuccess] = useState(false)
	const [categorias, setCategorias] = useState([])
	const [isLoadingCategorias, setIsLoadingCategorias] = useState(true);
	const [file, setFile] = useState()

	const values = getValues()

	const handleClose = () => {
		setOpenModal(false)
	}

	const handleCloseAlert = () => {
		history.replace('/produtos')
		setShowRegisterSuccess(false)
	}

	useEffect(() => {
		console.log(errors)
	}, [errors])

	// ---------------------------------- requisição mandar infos editadas ---------------------------//
	const onSubmit = () => {
		console.log('vim aqui')
		const getCents = (value) => parseInt(value.toString().replace(/\D/g, ""));
		console.log(values)
		fetch('https://icubus.herokuapp.com/perfil', {
			method: 'PUT',
			body: JSON.stringify({
				nome: values.nome,
				email: values.email,
				senha: values.senha,
				restaurante: {
					nome: values.nome_restaurante,
					descricao: values.descricao,
					idCategoria: values.idCategoria,
					taxaEntrega: getCents(values.taxa_entrega),
					tempoEntregaEmMinutos: parseInt(values.tempo_entrega_minutos),
					valorMinimoPedido: getCents(values.valor_minimo_pedido),
					senha: values.senha,
					nomeImagem: file,
					imagem: baseImage,
				}
			}),
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		}).then(async (res) => {
			const data = await res.json()

			if (res.status > 299) {
				setError(data)
			} else {

				handleClose()
			}
		})
	}

	// ---------------------------------- requisição mandar infos editadas ---------------------------//

	// ---------------------------------- requisição informações perfil ---------------------------//
	const getDetailsProfile = async () => {
		setIsLoadingDetails(true)
		await fetch('https://icubus.herokuapp.com/perfil', {
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		}).then(async (res) => {
			const data = await res.json()

			if (res.status > 299) {
				setError(data)
			} else {
				console.log(data)
				setDetailsSuccess(true)
				setDetails(data)
				// setValue("nome", data.usuario.nome)
				// setValue("email", data.usuario.email)
				// setValue("nome_restaurante", data.restaurante.nome)
				// setValue("descricao", data.restaurante.descricao)
				// setValue("idCategoria", data.restaurante.categoria_id)
				// setValue("taxa_entrega", data.restaurante.taxa_entrega)
				// setValue("tempo_entrega_minutos", data.restaurante.tempo_entrega_minutos)
				// setValue("valor_minimo_pedido", data.restaurante.valor_minimo_pedido)
			}

			setIsLoadingDetails(false)
		})
	}

	useEffect(() => {
		!detailsSuccess && getDetailsProfile()
	}, [])

	// ---------------------------------- requisição informações perfil ---------------------------//

	// ---------------------------------- uploadImage ----------------------------------------//
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
	};

	const uploadImage = async (e) => {
		const file = e.target.files[0];
		setFile(file.name);
		const base64 = await convertBase64(file);
		const formatImg = base64.replace("data:", "").replace(/^.+,/, "")
		setBaseImage(formatImg);
	};
	// ---------------------------------- uploadImage ----------------------------------------//

	// ---------------------------------- mascara $$ ----------------------------------------//
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

	// ---------------------------------- mascara $$ ----------------------------------------//

	const inputNome = register('nome', { required: true });
	const inputEmail = register('email', { required: true });
	const inputNomeRestaurante = register('nome_restaurante', { required: true });
	const inputDescricao = register('descricao');
	const tempo_entrega_minutos = register('tempo_entrega_minutos', { required: true })
	const inputCategoria = register('idCategoria', { required: true })

	const removeDetails = (parent, key) => {
		setDetails((currentDetails) => ({
			...currentDetails,
			[parent]: {
				...currentDetails[parent],
				[key]: undefined
			}
		}))
	}


	async function getCategorias() {
		setIsLoadingCategorias(true)
		await fetch('https://icubus.herokuapp.com/categorias')
			.then(async (res) => {
				const data = await res.json()
				setCategorias(data)
				setIsLoadingCategorias(false)
			})
	}

	useEffect(() => {
		getCategorias()
	}, [])


	return (
		<div className='wrapperEditProfile'>
			<div className='font-montserrat containerEditProfile'>
				<h1>Editar Perfil</h1>
				<form className='formsEditProfile' id='forms-edit-profile' onSubmit={handleSubmit(onSubmit)}>
					<div className='flex-column inputEditProfile'>
						<span>Nome de usuário</span>
						{/* <TextField
							id="input-edit-nome"
							type='text'
							variant="outlined"
							autoComplete="off"
							defaultValue={details.usuario.nome}
							error={Boolean(errors.nome)}
							helperText={errors.nome ? "Campo Obrigatório" : false}
							disabled={isLoadingDetails}
							{...inputNome}
							onChange={(e) => {
								inputNome.onChange(e);
							}}
						/> */}
						<TextField
							size='small'
							type='text'
							variant='outlined'
							id='name'
							vakue={details.usuario.nome}
							{...register('nome', { maxLength: 50 })}
						/>

						<span>Email</span>
						<TextField
							id="input-edit-email"
							type='email'
							variant="outlined"
							autoComplete="off"
							error={Boolean(errors.email)}
							helperText={errors.email ? "Campo Obrigatório" : false}
							{...details.usuario.email && {
								value: details.usuario.email
							}}
							{...inputEmail}
							onChange={(e) => {
								removeDetails('usuario', 'email');
								inputEmail.onChange(e);
							}} />

						<span>Nome do restaurante</span>
						<TextField
							id="input-edit-nome-restaurante"
							type='text'
							variant="outlined"
							autoComplete="off"
							error={Boolean(errors.nomeRestaurante)}
							helperText={errors.nomeRestaurante ? "Campo Obrigatório" : false}
							{...details.restaurante.nome && {
								value: details.restaurante.nome
							}}
							{...inputNomeRestaurante}
							onChange={(e) => {
								removeDetails('restaurante', 'nome');
								inputNomeRestaurante.onChange(e);
							}} />

						<span>Categoria do restaurante</span>
						<TextField
							id="categoria-restaurante"
							select
							variant="outlined"
							error={Boolean(errors.idCategoria)}
							helperText={errors.idCategoria ? "Campo Obrigatório" : false}
							value={2}
							{...details.restaurante.categoria_id && !isLoadingCategorias && {
								value: details.restaurante.categoria_id
							}}
							{...inputCategoria}
							onChange={(e) => {
								removeDetails('restaurante', 'idCategoria');
								inputCategoria.onChange(e);
							}}
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
							autoComplete="off"
							helperText='Max. 50 caracteres'
							{...details.restaurante.descricao && {
								value: details.restaurante.descricao
							}}
							{...inputDescricao}
							onChange={(e) => {
								removeDetails('restaurante', 'descricao');
								inputDescricao.onChange(e);
							}} />

						<span>Taxa de entrega</span>
						<TextField
							id="input-taxa-entrega"
							type='text'
							variant="outlined"
							autoComplete="off"
							error={Boolean(errors.taxa_entrega)}
							helperText={errors.taxa_entrega ? "Campo Obrigatório" : false}
							{...details.restaurante.taxa_entrega && {
								value: currencyFormatter(details.restaurante.taxa_entrega)
							}}
							{...taxa_entrega}
							onChange={(e) => {
								removeDetails('restaurante', 'taxa_entrega')
								taxa_entrega.onChange(setCurrencyMask(e))
							}} />

						<span>Tempo estimado de entrega</span>
						<TextField
							id="input-tempo-entrega"
							type='text'
							variant="outlined"
							placeholder="Tempo de entrega em minutos"
							autoComplete="off"
							error={Boolean(errors.tempo_entrega_minutos)}
							helperText={errors.tempo_entrega_minutos ? "Campo Obrigatório" : false}
							{...details.restaurante.tempo_entrega_minutos && {
								value: details.restaurante.tempo_entrega_minutos
							}}
							{...tempo_entrega_minutos}
							onChange={(e) => {
								removeDetails('restaurante', 'tempo_entrega_minutos')
								tempo_entrega_minutos.onChange(e)
							}}
						/>

						<span>Valor mínimo do pedido</span>
						<TextField
							variant="outlined"
							id="input-valor-minimo"
							autoComplete="off"
							error={Boolean(errors.valor_minimo_pedido)}
							helperText={errors.valor_minimo_pedido ? "Campo Obrigatório" : false}
							{...details.restaurante.valor_minimo_pedido && {
								value: currencyFormatter(details.restaurante.valor_minimo_pedido)
							}}
							{...valor_minimo_pedido}
							onChange={(e) => {
								removeDetails('restaurante', 'valor_minimo_pedido')
								valor_minimo_pedido.onChange(setCurrencyMask(e))
							}} />


						<span className='credentialsStyle font-montserrat'>Senha</span>
						<InputSenha
							error={Boolean(errors.senha)}
							helperText={errors.senha ? "Campo Obrigatório" : false}
							register={() => register('senha')}
							id="input_senha_editar_perfil"
						/>

						<span className='credentialsStyle font-montserrat'>Repita sua senha</span>
						<InputSenha
							error={Boolean(errors.senha_repetida)}
							helperText={errors.senha_repetida ? "Campo Obrigatório" : false}
							register={() => register('senha_repetida', {
								validate: (value) => {
									if (!watch('senha')) return true
									return value === watch('senha') || "Senhas não conferem"
								}
							})}
							id="input_senha_repetida_editar_perfil" />
					</div>


					<div className='containerInputFile'>
						<input
							id='inputFileProfile'
							className='inputFile'
							type="file"
							onChange={uploadImage}
						/>
						<img src={baseImage ? `data:image/jpeg;base64,${baseImage}` : details.restaurante.imagem} className='profilePicture' alt="" />

						<Alert severity="success" onClose={handleCloseAlert}>
							Perfil atualizado com sucesso
						</Alert>
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
		</div>
	)
}

