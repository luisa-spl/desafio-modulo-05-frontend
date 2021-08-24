import { useState } from "react";

export default function useProductsProvider() {

	const [produtos, setProdutos] = useState([
		{
			nome: "Sushi",
			imagem: "https://cdn.pixabay.com/photo/2014/06/21/02/28/sushi-373587_960_720.jpg",
			quantidade: 2,
			preco: 2275,
			precoTotal: 4550,
			id: 1,
		},
		{
			nome: "Yakissoba",
			imagem: "https://cdn.pixabay.com/photo/2017/04/04/00/43/japanese-food-2199968_960_720.jpg",
			quantidade: 1,
			preco: 2275,
			precoTotal: 2275,
			id: 2,
		},

	]);
	const [atualizaProduto, setAtualizaProduto] = useState(false);
	const [confirmCart, setConfirmCart] = useState({
		pedidoId: 1,
		cliente_nome: 'Camila Boscariol',
		clienteId: 1,
		endereco: "Rua da Camila - 09920-450",
		total: 6825
	}
	);

	return {
		produtos,
		setProdutos,
		atualizaProduto,
		setAtualizaProduto,
		confirmCart,
		setConfirmCart,
	};
}
