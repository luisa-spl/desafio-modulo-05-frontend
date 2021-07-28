import React from 'react';
import './style.css';
import ActionButton from '../../Components/ActionButton';
import Header from '../../Components/Header';
import CardProduct from '../../Components/CardProduct';
import data from '../../Utils/data';

function Produtos() {
    return(
        <div className='flex-column items-center container-products'>
            <Header />

            {data.length == 0 ? 
                    <div className='flex-column content-center items-center main-products'>
                        <div className='flex-row items-center content-center font-montserrat font-color-gray text-products'>
                            Você ainda não tem nenhum produto no seu cardápio. Gostaria de adicionar um novo produto?
                        </div>
                        <ActionButton />
                    </div> 

                    :

                    <div className='flex-column items-center container-main'>
                        <div className='actBtn'>
                            <ActionButton />
                        </div>
                        <div className='grid'>
                            {data.map((x) => {
                                return (
                                    <CardProduct 
                                        nome={x.nome}
                                        descricao={x.descricao}
                                        img={x.img}
                                        preco={x.preco} 
                                    />
                                )
                            })} 
                        </div>
                    </div>
            }
        </div>
    )
}

export default Produtos;