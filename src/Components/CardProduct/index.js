import React, { useState, useContext } from 'react';
import ModalEditProduct from '../ModalEditProduct';
import PenIcon from '../../Assets/pen-icon.svg';
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import { getProducts, deleteProduct } from '../../Services/functions';
import useStyles from './style';
import './style.css';

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import {
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    IconButton,
} from '@material-ui/core'; 



export default function CardProduct({ id, nome, preco, descricao, img }) {
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const [ openModal, setOpenModal ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ carregando, setCarregando ] = useState(false);
  const { setProdutos } = useProductsContext();
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

  const handlecloseAlert = () => {
      setErro('');
  }

  async function handleDelete() {
      setCarregando(true);

      const { erro } = await deleteProduct({id, token});
     
      if(erro){
        setErro(erro)
        setCarregando(false);
        handleClose();
        return 
      }

      const { lista, error } = await getProducts(token);
                
        if(error){
          return setErro(error)
        }
        
      setProdutos(lista) 

      setCarregando(false)    
  }

  return (
    <Card id='card' className={classes.root}>
      <CardContent id='cardContent' className={classes.cardContent} onClick={handleClickOpenModal}>
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
          width="140"
          image={img}
          title="Contemplative Reptile"
        />
        </div>
      </CardContent>

      <div  className='modalFechado' onClick={handleClose}>   
            <button 
              className='transparent-btn font-montserrat font-color-orange font-bold'
              onClick={handleDelete}  
            >
              Excluir Produto
            </button>
            
            <button className='btn-orange-small font-montserrat font-color-white' onClick={() => handleClick()}>
                <div style={{marginRight: '10px'}}>
                  Editar Produto
                </div>
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
              {erro &&
                  <Alert severity="error" onClick={handlecloseAlert}>{erro} 
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                  </Alert> 
              }      
    </Card>
  );
}