import lineModal from '../../Assets/line-modal.svg'
import Alert from '@material-ui/lab/Alert';
import './styles.css';
import CardDetails from '../CardDetails'
import closeIcon from '../../Assets/close-icon.svg'
import { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext'
import { ProductsContext } from '../../Contexts/ProductsContext'
import { enviaPedido } from '../../Services/functions'

function RealCart() {
	const { token } = useContext(AuthContext);
	const { produtos, confirmCart } = useContext(ProductsContext);
	const [erroSubmit, setErroSubmit] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)
	const history = useHistory()

	const handleClose = () => {
		history.push('/pedidos')
	}

	const onSubmit = async () => {

		const result = await enviaPedido({ token, id: confirmCart.pedidoId });

		if (result.error) {
			setErroSubmit(result.error)
		} else {
			setShowSuccess(true)
		}
	}

	const handleCloseAlert = () => {
		setErroSubmit('')
		setShowSuccess('')
	}

	return (
		<div>

			<div className='wrapperModal'>
				<div className='font-montserrat containerModal'>
					<img src={closeIcon} className='closeModal' alt="fechar" onClick={handleClose} />
					<div className='boxContainer'>
						<header className='headerModal'>
							<h1>{confirmCart.pedidoId}</h1>
							<h2>Cliente: {confirmCart.cliente_nome}</h2>
						</header>
						<div className='contentModal'>
							<p className='font-color-orange font-bold'>Endereço de Entrega: <span className='font-color-gray font-weight-normal '>
								{confirmCart.endereco}	</span> </p>

							{produtos.map((produto) => (
								<CardDetails
									imagem={produto.imagem}
									nome={produto.nome}
									quantidade={produto.quantidade}
									precoTotal={produto.precoTotal}
								/>
							))}

							<img src={lineModal} alt="" />
							<div className='finalCart font-color-gray font-size-3 '>
								<p className='finalCartStyle'>Total <spam className='font-size-1'>R$ {(confirmCart.total) / 100}</spam> </p>
							</div>
							<div className='flex-row actionButtons '>
								<button
									className='btn-orange-small font-montserrat font-color-white'
									type='submit'
									onClick={onSubmit}
								>
									Enviar Pedido
								</button>
							</div>
							<div className='alert-confirmacao-pedido'>
								{erroSubmit && <Alert variant="filled" severity="error" onClose={handleCloseAlert}>{erroSubmit}</Alert>}
								{showSuccess && <Alert variant="filled" severity="success" onClose={handleCloseAlert}>Pedido enviado com sucesso</Alert>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}


export default RealCart
