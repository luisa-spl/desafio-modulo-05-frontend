import { createContext } from "react";
import useProductsProvider from "../Hooks/useProductsProvider";

export const ProductsContext = createContext();

export function ProductsProvider(props) {
	const produtos = useProductsProvider();

	return (
		<ProductsContext.Provider value={produtos}>{props.children}</ProductsContext.Provider>
	);
}

export default ProductsContext;
