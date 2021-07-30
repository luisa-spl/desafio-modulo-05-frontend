import React from 'react';
import { useEffect, useState, useContext } from 'react';
import ActionButton from '../../Components/ActionButton';
import Header from '../../Components/Header';
import CardProduct from '../../Components/CardProduct';
import { AuthContext } from '../../Contexts/AuthContext';
import PizzaImg from '../../Assets/pizza.png';
import './style.css';

import Alert from '@material-ui/lab/Alert';


function Produtos() {
    const { token } = useContext(AuthContext);
    const [ erro, setErro ] = useState('');
    const [ produtos, setProdutos ] = useState([]);

    useEffect( () => {
        async function listarProdutos() {
                
            try {
                const resposta = await fetch('https://icubus.herokuapp.com/produtos', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json' 
                    }
                });
            
                const  dadosResp = await resposta.json();
                console.log(dadosResp, "/produtos, method: GET")
                return setProdutos(dadosResp);
            } 
            catch(error) {
                return setErro(error.message);
            }
        };
    
        listarProdutos();
    }, []);

    return(
        <div className='flex-column items-center container-products'>
            <Header />

            {produtos.length > 0 ? 
                    <div className='flex-column items-center container-main'>
                        <div className='actBtn'>
                            <ActionButton />
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
                        <ActionButton />
                        {erro && <Alert severity="error">{erro}</Alert>}
                    </div>


            }
        </div>
    )
}

export default Produtos;