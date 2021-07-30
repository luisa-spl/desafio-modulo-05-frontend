import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalEditProduct from '../ModalEditProduct';
import PenIcon from '../../Assets/pen-icon.svg';
import { AuthContext } from '../../Contexts/AuthContext';
import useStyles from './style';
import './style.css';

import Alert from '@material-ui/lab/Alert';
import {
    Card,
    CardMedia,
    CardContent,
    CircularProgress
} from '@material-ui/core'; 


export default function CardProduct({ id, nome, preco, descricao, img, ativo }) {
  const classes = useStyles();
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const [ openModal, setOpenModal ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ carregando, setCarregando ] = useState(false);
  const [ erro, setErro ] = useState('');
  const precoFormatado = (preco/100).toFixed(2); 
  
  function handleClick() {
    setOpen(true)
  }

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  async function handleDelete() {
    setCarregando(true);
    console.log(ativo)
    console.log(id);
        try {
            const resposta = await fetch(`https://icubus.herokuapp.com/produtos/${id} `, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,  
                }
            });

            const  dadosResp = await resposta.json();
            setCarregando(false)
            console.log(dadosResp)
            
            if(!dadosResp.ok) {
               setErro(dadosResp)
            }
        }
        catch(error) {
          console.log('entrou aqui')
            setCarregando(false);
            setErro(error.message);
            return 
        }
  }

  return (
    <Card id='card' className={classes.root}>
      <CardContent className={classes.cardContent} onClick={handleClickOpenModal}>
        <div className={classes.divContent}>
            <h2 className={classes.h2}>{nome}</h2>
            <span className={classes.spanDesc}>{descricao}</span>
            <div className={classes.priceDiv}>
                {`R$${precoFormatado}`}
            </div>
        </div>
        
        <div >
        <CardMedia
          className={classes.cardImg}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={img}
          title="Contemplative Reptile"
        />
        </div>
      </CardContent>

      <div className={ openModal ? classes.modalAberto : classes.modalFechado} onClick={handleClose}>
            <button 
              className='transparent-btn font-montserrat font-color-orange font-bold'
              onClick={handleDelete}  
            >
              Excluir Produto
            </button>
            
            <button className='btn-orange-small font-montserrat font-color-white' onClick={() => handleClick()}>
                <div style={{marginRight: '10px'}}>Editar Produto</div>
                <img src={PenIcon} alt='' />
            </button> 
            <ModalEditProduct 
              open={open} 
              setOpen={setOpen} 
              id={id} 
              img={img}
              />
      </div>
              {carregando && <CircularProgress />}
              
    </Card>
  );
}