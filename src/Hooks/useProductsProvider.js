import { useState } from "react";

export default function useProductsProvider() {
	const [produtos, setProdutos] = useState([]);
	const [atualizaProduto, setAtualizaProduto] = useState(false);
	const [pedido, setPedido] = useState();

	return {
		produtos,
		setProdutos,
		atualizaProduto,
		setAtualizaProduto,
		pedido,
		setPedido
	};
}
