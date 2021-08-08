import { useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import './style.css';
import NewEditProfile from '../NewEditProfile'

import { AuthContext } from '../../Contexts/AuthContext';



function Header() {
	const history = useHistory();
	const [openModal, setOpenModal] = useState(false);
	const { token } = useContext(AuthContext);
	const [error, setError] = useState('');
	const [idCategoria, setIdCategoria] = useState('')
	const [imagemCategoria, setImagemCategoria] = useState()
	const [imagemPerfil, setImagemPerfil] = useState()
	const [nomeRestaurante, setNomeRestaurante] = useState()

	function handleOpenModal() {
		setOpenModal(true)
	}

	function logout() {
		localStorage.clear();
		history.push('/');
	}

	//--------------------------------------getCategoriasPerfil----------------------------------//
	const getDetailsProfile = async () => {
		await fetch('https://icubus.herokuapp.com/perfil', {
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		}).then(async (res) => {
			const data = await res.json()
			if (res.status > 299) {
				setError(data)
			} else {
				setIdCategoria(data.restaurante.categoria_id)
				setImagemPerfil(data.restaurante.imagem)
				setNomeRestaurante(data.restaurante.nome)
			}
		})
	}

	//---------------------------------------getCategorias------------------------------------//


	async function getImagemCategoria() {
		await fetch('https://icubus.herokuapp.com/categorias')
			.then(async (res) => {
				const data = await res.json()
				if (res.status < 300) {
					const categoria = data.find((item) => item.id === idCategoria)
					setImagemCategoria(categoria.imagem)
				}
			})
	}
	//------------------------------------------------------------------------------//

	useEffect(() => {
		!idCategoria && getDetailsProfile()
		idCategoria && getImagemCategoria()
	}, [idCategoria])

	//------------------------------------------//-------------------------------------------------//

	return (
		<div className='flex-row items-flex-end headerProducts' style={{ backgroundImage: `url(${imagemCategoria})`, backgroundSize: "cover", }}>
			<img className='imgProfile' src={imagemPerfil} alt='background pizzaria' onClick={handleOpenModal} />
			{openModal && <NewEditProfile setOpenModal={setOpenModal} setImagemPerfil={setImagemPerfil} />}
			<h1 className='font-baloo font-color-white title-header'>{nomeRestaurante}</h1>
			<button className='font-montserrat font-color-white btn-logout' onClick={() => logout()}>Logout</button>
		</div>
	)
}

export default Header;
