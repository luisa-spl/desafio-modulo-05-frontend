import { useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import './style.css';
import Logo from '../../Assets/pizarria.png';
import ModalEditProfile from '../ModalEditProfile'
import { AuthContext } from '../../Contexts/AuthContext';



function Header() {
	const history = useHistory();
	const [openModal, setOpenModal] = useState(false);
	const { token } = useContext(AuthContext);
	const [error, setError] = useState('');
	const [idCategoria, setIdCategoria] = useState('')

	const [imagemCategoria, setImagemCategoria] = useState()

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
		<div className='flex-row items-flex-end headerProducts' style={{ backgroundImage: `url(${imagemCategoria})` }}>
			<img className='imgProfile' src={Logo} alt='background pizzaria' onClick={handleOpenModal} />
			{openModal && <ModalEditProfile setOpenModal={setOpenModal} />}
			<h1 className='font-baloo font-color-white title-header'>Pizza Pizzaria & Delivery</h1>
			<button className='font-montserrat font-color-white btn-logout' onClick={() => logout()}>Logout</button>
		</div>
	)
}

export default Header;
