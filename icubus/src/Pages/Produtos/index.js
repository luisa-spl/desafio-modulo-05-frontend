import React from 'react';
import './style.css';

import Logo from '../../Assets/pizarria.png';

function Produtos() {
    return(
        <div className='flex-column container-products'>
            <div className='flex-row items-flex-end headerProducts'>
                <img className='imgProfile' src={Logo} alt='background pizzaria' />
                <h1 className='font-baloo font-color-white title-header'>Pizza Pizzaria & Delivery</h1>
                <button className='font-montserrat font-color-white btn-logout'>Logout</button>
            </div>
            <div className='flex-column content-center items-center main-products'>
                <div className='flex-row items-center content-center font-montserrat font-color-gray text-products'>
                    Você ainda não tem nenhum produto no seu cardápio. Gostaria de adicionar um novo produto?
                </div>
                <button className='btn-orange-big font-montserrat font-color-white'>Adicionar produto ao cardápio</button>
            </div>
        </div>
    )
}

export default Produtos;