import { useState } from "react";

export default function useProductsProvider() {
  const [produtos, setProdutos] = useState([]);
  const [ atualizaProduto, setAtualizaProduto ] = useState(false);
  
  return {
    produtos,
    setProdutos,
    atualizaProduto,
    setAtualizaProduto
  };
}