import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ModalEditProduct from '../ModalEditProduct';
import PenIcon from '../../Assets/pen-icon.svg';

const useStyles = makeStyles({
  root: {
    maxWidth:  400,
    minHeight: 'min-content',
    padding: '0.5rem',
    boxShadow: '0px 4px 6px rgba(50, 50, 50, 0.24)',
    borderRadius: '24px'
  },

  divContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: '0.5rem',
      width: '10rem',
      height: '8.7rem',
  },

  cardContent: {
      display: 'flex',
      gap: '2rem',
      height: '9rem',
      position: 'relative'
  },

  cardImg: {
    borderRadius: '16px',
  },

  priceDiv: {
      background: 'linear-gradient(0deg, rgba(13, 138, 79, 0.1), rgba(13, 138, 79, 0.1)), #FFFFFF',
      borderRadius: '4px',
      width: 'min-content',
      color: '#006335',
      fontWeight: 'bold'
  },

  h2: {
      margin: 0,
      color: 'rgba(82, 84, 89, 1)'
  },

  spanDesc: {
      flexGrow: 1,
      marginTop: '0.3rem',
      color: 'rgba(34, 34, 34, 0,87)'
  },

  modalAberto: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      position: 'absolute',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(6px)',
      borderRadius: '24px',
      width: '24rem',
      height: '10.8rem',
      zIndex: 2,
      marginTop: '-10.8rem',
  },

  modalFechado: {
      display: 'none'
  }
});

export default function CardProduct({nome, preco, descricao, img}) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
    
  function handleClick() {
      setOpen(true)
  }

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  

  return (
    <Card id='card' className={classes.root}>
      <CardContent className={classes.cardContent} onClick={handleClickOpenModal}>
        <div className={classes.divContent}>
            <h2 className={classes.h2}>{nome}</h2>
            <span className={classes.spanDesc}>{descricao}</span>
            <div className={classes.priceDiv}>
                {`R$${preco}`}
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
            <button className='transparent-btn font-montserrat font-color-orange font-bold'>Excluir Produto</button>
            <button className='btn-orange-small font-montserrat font-color-white' onClick={() => handleClick()}>
                <div style={{marginRight: '10px'}}>Editar Produto</div>
                <img src={PenIcon} alt='' />
            </button> 
            <ModalEditProduct open={open} setOpen={setOpen} />
      </div>
    </Card>
  );
}