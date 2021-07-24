import { useState } from 'react';
import ModalAddProduct from '../ModalAddProduct';
import './style.css';


function ActionButton(){
    const [open, setOpen] = useState(false);
    
    function handleClick() {
        setOpen(true)
    }

    return(
        <div>
            <ModalAddProduct open={open} setOpen={setOpen} />
            <button 
                className='btn-orange-big font-montserrat font-color-white'
                onClick={() => handleClick()} 
            >
                Adicionar produto ao cardápio
            </button>
        </div>
    )
}

export default ActionButton;
