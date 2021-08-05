import { useState } from "react";

export default function useProductsProvider() {
  const [produtos, setProdutos] = useState([]);
  
  return {
    produtos,
    setProdutos
  };
}