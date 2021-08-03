import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Header from '../../Components/Header';
import CardProduct from '../../Components/CardProduct';
import ModalAddProduct from '../../Components/ModalAddProduct';
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import PizzaImg from '../../Assets/pizza.png';
import './style.css';
import { getProducts } from '../../Services/functions';
import Alert from '@material-ui/lab/Alert';



function Produtos() {
	const { token } = useContext(AuthContext);
	const [erro, setErro] = useState('');
	const { produtos, setProdutos } = useProductsContext();
	const [open, setOpen] = useState(false);

	function handleClick() {
		setOpen(true)
	}

	useEffect(() => {
		async function listarProdutos() {
			setErro('');
			const { lista, error } = await getProducts(token);

			if (error) {
				return setErro(error)
			}
			return setProdutos(lista)
		};

		listarProdutos();
	}, [token, produtos]);

	return (
		<div className='flex-column items-center container-products'>
			<Header />

			{produtos.length > 0 ?
				<div className='flex-column items-center container-main'>
					<div className='actBtn'>
						<div>
							<ModalAddProduct open={open} setOpen={setOpen} />
							<button
								className='btn-orange-big font-montserrat font-color-white'
								onClick={() => handleClick()}
							>
								Adicionar produto ao cardápio
							</button>
						</div>
					</div>
					<div className='grid'>
						{produtos.map((x) => {
							return (
								<CardProduct
									key={x.id}
									id={x.id}
									id_restaurante={x.id_restaurante}
									nome={x.nome}
									descricao={x.descricao}
									img={PizzaImg}
									preco={x.preco}
									ativo={x.ativo}
									permite_observacoes={x.permite_observacoes}
								/>
							)
						})}
					</div>
				</div>

				:

				<div className='flex-column content-center items-center main-products'>
					<div className='flex-row items-center content-center font-montserrat font-color-gray text-products'>
						Você ainda não tem nenhum produto no seu cardápio. Gostaria de adicionar um novo produto?
					</div>

					<div>
						<ModalAddProduct open={open} setOpen={setOpen} />
						<button
							className='btn-orange-big font-montserrat font-color-white'
							onClick={() => handleClick()}
						>
							Adicionar produto ao cardápio
						</button>
					</div>

					{erro && <Alert severity="error">{erro}</Alert>}
				</div>


			}
		</div>
	)
}

export default Produtos;
