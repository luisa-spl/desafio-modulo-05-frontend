import { useContext } from "react";

import ProductsContext from "../Contexts/ProductsContext";

export default function useProductsContext() {
  return useContext(ProductsContext);
}