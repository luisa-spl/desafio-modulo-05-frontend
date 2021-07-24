import React from 'react';
import './style.css';
import ActionButton from '../../Components/ActionButton';
import Header from '../../Components/Header';
// import Logo from '../../Assets/pizarria.png';

function Produtos() {
    return(
        <div className='flex-column container-products'>
            <Header />
            <div className='flex-column content-center items-center main-products'>
                <div className='flex-row items-center content-center font-montserrat font-color-gray text-products'>
                    Você ainda não tem nenhum produto no seu cardápio. Gostaria de adicionar um novo produto?
                </div>
                <ActionButton />
            </div>
        </div>
    )
}

export default Produtos;