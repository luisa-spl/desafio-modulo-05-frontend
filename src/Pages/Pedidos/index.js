import React, { useEffect, useContext, useState } from 'react';
import Header from '../../Components/Header'
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import { getOrders, getSentOrders } from '../../Services/functions';
import './style.css';
import OrderDetails from '../../Components/OrderDetails'


function Pedidos() {
	const { token } = useContext(AuthContext);
	const { pedido, setPedido } = useProductsContext();
	const [ erro, setErro ] = useState('');
	const [ pedidos, setPedidos ] = useState([]);
	const [ openModal, setOpenModal ] = useState(false);
	const [	foiEntregue, setFoiEntregue ] = useState(false);
	const [ pedidosEntregues, setPedidosEntregues ] = useState([]);

	async function listarPedidos() {
		setErro('');
		const { lista, erros, errorGet } = await getOrders(token);

		if (erros) {
			return setErro(erros)
		}

		if (errorGet) {
			setErro(errorGet)
		}

		return setPedidos(lista)
	};

	useEffect(() => {
		listarPedidos()
	}, [token, openModal])

	async function listarPedidosEntregues() {
		setErro('');
		const { lista, erros, errorGet } = await getSentOrders(token);

		if (erros) {
			return setErro(erros)
		}

		if (errorGet) {
			setErro(errorGet)
		}

		return setPedidosEntregues(lista)
	};

	useEffect(() => {
		listarPedidosEntregues()
	}, [token, foiEntregue])

	function handleClick(p) {
		setPedido(p)
		setOpenModal(true)
	}


	return (
		<div className='flex-column items-center container-orders'>
			<Header />

			<div className='flex-row btn-orders' >
				<button
					className={foiEntregue ? 'btn-left-order font-montserrat font-color-gray background-gray' : 'btn-left-order font-montserrat font-color-white background-orange' }
					type='text'
					onClick={() => setFoiEntregue(false)}
				>
					Não Entregues
				</button>
				<button
					className={foiEntregue ? 'btn-right-order font-montserrat font-color-white background-orange' : 'btn-right-order font-montserrat font-color-gray background-gray' }
					type='text'
					onClick={() => setFoiEntregue(true)}
				>
					Entregues
				</button>
			</div>

			
			<div className='flex-row items-center font-lato table-header'>
				<div className='flex-row items-header'>Pedido</div>
				<div className='flex-row items-header'>Itens</div>
				<div className='flex-row items-header'>Endereço</div>
				<div className='flex-row items-header'>Cliente</div>
				<div className='flex-row items-header'>Total</div>
			</div>
			
			<div className={foiEntregue === false ? "flex-column orders-main-div" : "none"}>
				{openModal && <OrderDetails setOpenModal={setOpenModal} foiEntregue={foiEntregue} />}

				{pedidos && pedidos.length > 0 ?
					pedidos.map((p) => {
						return (
							<div className='flex-row items-center table-line font-lato' onClick={() => handleClick(p)}>
								<div className='flex-row items-header'>{p.id>9 ? `0${p.id}` : `00${p.id}`}</div>
								<div className='flex-column items-header'>
									<div>{`${p.produtos[0].nome} - ${p.produtos[0].quantidade} uni `}</div>
									{p.produtos.length >1 ?
										<div>{`${p.produtos[1].nome} - ${p.produtos[1].quantidade} uni`}</div>
										:
										""
									}
									{p.produtos.length >2 ?
										<div 
											className='font-color-orange font-size-2 font-bold font-size-2'
											style={{cursor: 'pointer'}}
										>
											ver mais
										</div>
										:
										""
									}
								</div>
								<div className='flex-column items-header-adress'>
									<div className='div-adress'>{`${p.cliente[0].endereco}`} </div>
									<div>{`${p.cliente[0].complemento}`}</div>
									<div>{`${p.cliente[0].cep}`}</div>
								</div>
								<div className='flex-row items-header'>{p.cliente[0].nome}</div>
								<div className='flex-row font-bold items-header'>{`R$${(p.total / 100).toFixed(2)}`}</div>
							</div>
						)
					})
					:
					<div
						className='flex-row items-center content-center font-montserrat font-bold font-color-orange'
						style={{ marginTop: '1.5rem' }}
					>
						Não há pedidos
					</div>
				}
			</div>

			<div className={foiEntregue ? "flex-column orders-main-div" : "none"} >
			{openModal && <OrderDetails setOpenModal={setOpenModal} foiEntregue={foiEntregue} />}
			
			{pedidosEntregues && pedidosEntregues.length > 0 ?
					pedidosEntregues.map((p) => {
						return (
							<div className='flex-row items-center table-line font-lato' onClick={() => handleClick(p)}>
								<div className='flex-row items-header'>{p.id>9 ? `0${p.id}` : `00${p.id}`}</div>
								<div className='flex-column items-header'>
									<div>{`${p.produtos[0].nome} - ${p.produtos[0].quantidade} uni `}</div>
									{p.produtos.length >1 ?
										<div>{`${p.produtos[1].nome} - ${p.produtos[1].quantidade} uni`}</div>
										:
										""
									}
									{p.produtos.length >2 ?
										<div 
											className='font-color-orange font-size-2 font-bold font-size-2'
											style={{cursor: 'pointer'}}
										>
											ver mais
										</div>
										:
										""
									}
								</div>
								<div className='flex-column items-header-adress'>
									<div className='div-adress'>{`${p.cliente[0].endereco}`} </div>
									<div>{`${p.cliente[0].complemento}`}</div>
									<div>{`${p.cliente[0].cep}`}</div>
								</div>
								<div className='flex-row items-header'>{p.cliente[0].nome}</div>
								<div className='flex-row font-bold items-header'>{`R$${(p.total / 100).toFixed(2)}`}</div>
							</div>
						)
					})
					:
					<div
						className='flex-row items-center content-center font-montserrat font-bold font-color-orange'
						style={{ marginTop: '1.5rem' }}
					>
						Não há pedidos
					</div>
				}
			</div>
		</div>
	)
}

export default Pedidos;
