import React, { useEffect, useContext, useState } from 'react';
import Header from '../../Components/Header'
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import { getOrders } from  '../../Services/functions';
import './style.css';

function Pedidos(){
    const { token } = useContext(AuthContext);
    const { pedido, setPedido } = useProductsContext();
    const [ erro, setErro ] = useState('');
    const [ pedidos, setPedidos ] = useState([]);
    const [ openModal, setOpenModal ] = useState(false);

    async function listarPedidos() {
        setErro('');
        const { lista, erros, errorGet } = await getOrders(token);

        if (erros) {
            return setErro(erros)
        }

        if(errorGet){
            setErro(errorGet)
        }
     
        return setPedidos(lista)
    };

    useEffect(() => {
        listarPedidos()
    }, [token])

    

    function handleClick(p) {
        setPedido(p)
        setOpenModal(true)
    }
    

    return(
        <div className='flex-column items-center container-orders'>
            <Header />

            <div className='flex-row btn-orders' >
                <button
                    className='btn-orange-order font-montserrat font-color-white'
                    type='text'
                >
                    Não Entregues
                </button>
                <button
                    className='btn-gray-order font-montserrat'
                    type='text'
                >
                    Entregues
                </button>
            </div>

            <div className='flex-row items-center table-header'>
                <div className='flex-row items-header'>Pedido</div>
                <div className='flex-row items-header'>Itens</div>
                <div className='flex-row items-header'>Endereço</div>
                <div className='flex-row items-header'>Cliente</div>
                <div className='flex-row items-header'>Total</div>
            </div>
            
            {pedidos && pedidos.length > 0 ?
                pedidos.map((p) => {
                    return (
                        <div className='flex-row items-center table-line' onClick={() => handleClick(p)}>
                            <div className='flex-row items-header'>{p.id}</div>
                            <div className='flex-column items-header'>
                                <div>{`${p.produtos[0].nome} - ${p.produtos[0].quantidade}und `}</div>
                                {p.produtos[1] ?
                                    <div>{`${p.produtos[1].nome} - ${p.produtos[1].quantidade}und`}</div>
                                    :
                                    ""
                                }
                            </div>
                            <div className='flex-row items-header'>{`${p.cliente[0].endereco},${p.cliente[0].complemento},${p.cliente[0].cep}`}</div>
                            <div className='flex-row items-header'>{p.cliente[0].nome}</div>
                            <div className='flex-row items-header'>{`R$${(p.total/100).toFixed(2)}`}</div>
                        </div>
                    )
                })
                :
                <div 
                    className='flex-row items-center content-center font-montserrat font-bold font-color-orange'
                    style={{marginTop: '1.5rem'}}    
                >
                    Não há pedidos
                </div>
            }
        </div>
    )
}

export default Pedidos;