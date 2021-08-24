import lineModal from '../../Assets/line-modal.svg'
import Alert from '@material-ui/lab/Alert';
import './styles.css';
import CardDetails from '../CardDetails'
import closeIcon from '../../Assets/close-icon.svg'
import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext'
import { ProductsContext } from '../../Contexts/ProductsContext'
import { enviaPedido } from '../../Services/functions'

function RealCart({ setProdutoEscolhido, setOpenCarrinho, closeRevisaoPedido }) {
	const { token } = useContext(AuthContext);
	const { produtos, confirmCart } = useContext(ProductsContext);
	const [erroSubmit, setErroSubmit] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)

	const handleClose = () => {
		''
	}


	function openProductDetails(produto) {
		setProdutoEscolhido(produto);
		setOpenCarrinho(true);
		closeRevisaoPedido();
	}

	const onSubmit = async () => {

		const result = await enviaPedido({ token, id: confirmCart.clienteId });

		if (result.error) {
			setErroSubmit(result.error)
		} else {
			setShowSuccess(true)
		}
	}


	const handleCloseErrorAlert = () => {
		setErroSubmit('')
	}




	return (
		<div>

			<div className='wrapperModal'>
				<div className='font-montserrat containerModal'>
					<img src={closeIcon} className='closeModal' alt="fechar" onClick={handleClose} />
					<div className='boxContainer'>

						<header className='headerModal'>
							<h1>{confirmCart.pedidoId}</h1>
							<h2>{confirmCart.cliente_nome}</h2>
						</header>
						<div className='alert-confirmacao-pedido'>
							{erroSubmit && <Alert variant="filled" severity="error" onClose={handleCloseErrorAlert}>{erroSubmit}</Alert>}
						</div>


						<div className='contentModal'>
							<p className='font-color-orange font-bold'>Endereço de Entrega: <span className='font-color-gray font-weight-normal '>
								{confirmCart.endereco}	</span> </p>

							{produtos.map((produto) => (
								<CardDetails
									imagem={produto.imagem}
									nome={produto.nome}
									quantidade={produto.quantidade}
									precoTotal={produto.precoTotal}
									onClick={() => openProductDetails(produto)}
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

						</div>



					</div>


				</div>
			</div>
		</div>


	)
}


export default RealCart
