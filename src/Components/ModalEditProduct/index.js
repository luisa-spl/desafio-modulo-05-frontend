import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import useStyles from './style';
import { disableProduct, activateProduct, editProduct, getProducts } from '../../Services/functions';
import './style.css';

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { 
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        FormControlLabel,
        InputLabel,
        InputAdornment,
        Switch,
        TextField,
        CircularProgress,
        IconButton
    } from '@material-ui/core';



export default function ModalEditProduct({ open, setOpen, id, img }) {
    const classes = useStyles();
    const { token } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ carregando, setCarregando ] = useState(false);
    const { setProdutos } = useProductsContext();
    const [ erro, setErro ] = useState('');
    const [ item, setItem ] = useState([]);
    const [ active, setActive ] = useState({
        produto_ativo: Boolean(item.ativo),
        permite_observacoes: Boolean(item.permite_observacoes),
    });
    
    const handlecloseAlert = () => {
        setErro('');
    }

    useEffect(() => {
        async function listarProduto(){
            setErro('');
            try {
                const resposta = await fetch(`https://icubus.herokuapp.com/produtos/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    }
                });
            
                const  dados = await resposta.json();
              
                if(resposta.status >= 400) {
                    return setErro(dados)
                }

                setActive({
                    produto_ativo: Boolean(dados.ativo),
                    permite_observacoes: Boolean(dados.permite_observacoes),
                })
        
                return setItem(dados) 
            } 
            catch(error) {
                return setErro(error.message);
            }
        }   
        listarProduto()
    }, [token])

    

    const handleChange= (event) => {
            setActive({ ...active, [event.target.name]: event.target.checked});
    };

    const handleClose = () => {
           return setOpen(false);
    };



    async function onSubmit(data) {
            setCarregando(true)

            if(item.ativo === true && active.produto_ativo !== item.ativo ) {   
                const { erro } = await disableProduct({id, token})
              
                if(erro){
                    setErro(erro);
                    setCarregando(false);
                    handleClose();
                    return 
                }
               
            }

            if(item.ativo === false && active.produto_ativo !== item.ativo) {
                
                const { erro } = await activateProduct({id, token})
            ;
                if(erro){
                    setErro(erro)
                    setCarregando(false);
                    handleClose();
                    return 
                }
            }
            
            
            let precoFormatado = 0;
            const virg = ',';

            if(data.value.includes('.')){
                precoFormatado = Number(data.value).toFixed(2)*100;
            } else if(data.value.includes(',')){
                precoFormatado = Number(data.value.replace(virg, '.' )).toFixed(2)*100;
            } 
            else {
                precoFormatado = Number(data.value);
            }
            
            
            const produtoFormatado = {
                nome: data.name || item.nome,
                descricao: data.description || item.descricao,
                preco: precoFormatado || item.preco,
                permiteObservacoes: active.permite_observacoes
            }
                
                const { erro } = await editProduct({produtoFormatado, id, token})
                
                if(erro) {
                    setErro(erro);
                    setCarregando(false);
                    handleClose();
                    return 
                };
                
            
                const { lista, error } = await getProducts(token);
                
                if(error){
                    return setErro(error)
                }
                
                setProdutos(lista) 
        
            setCarregando(false);
            handleClose();
    };

    return (
        <div className={classes.dialog}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='xl'>
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Editar Produto</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                        <form  noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            <div className={classes.formDiv}>
                                <InputLabel htmlFor="name">Nome</InputLabel>
                                <TextField 
                                    size='small' 
                                    type='text'
                                    variant='outlined'
                                    id='name' 
                                    placeholder={item.nome}
                                    {...register('name', {maxLength: 50})} 
                                />  
                                    {errors.name?.type === 'maxLength' && <Alert severity="error">{'O nome deve ter até 50 caracteres'}</Alert>}  

                                <InputLabel htmlFor="description">Descrição</InputLabel>
                                <TextField  
                                    size='small' 
                                    variant='outlined'
                                    id='description'  
                                    placeholder={item.descricao}
                                    helperText="Max: 80 caracteres"
                                    {...register('description', { maxLength: 100 })} 
                                />               
                                    {errors.description?.type === 'maxLength' && <Alert severity="error">{'A descrição deve ter até 100 caracteres'}</Alert>}   

                                <InputLabel htmlFor="value">Valor</InputLabel>    
                                <TextField
                                    size='small' 
                                    type='text'
                                    variant='outlined'
                                    id='value'
                                    placeholder={item.preco/100}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    {...register('value')}
                                />

                                <FormControlLabel
                                    control={
                                    <Switch
                                    checked={active.produto_ativo}
                                        onChange={handleChange}
                                        name="produto_ativo"
                                        color="primary"
                                    />
                                    }
                                    label="Ativar produto"
                                />

                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={active.permite_observacoes}
                                        onChange={handleChange}
                                        name="permite_observacoes"
                                        color="primary"
                                    />
                                    }
                                    label="Permitir observações"
                                />
                            </div>

                            <div className={classes.uploadDiv}>
                                <div className={classes.profilePicture}>
                                    <img className='imgProduct' src={img}  alt=""/>
                                </div>
                            
                                <div className='flex-row'>
                                    <button 
                                        className='transparent-btn font-montserrat font-color-orange font-bold'
                                        onClick={handleClose}
                                        >
                                        Cancelar
                                    </button>

                                    <DialogActions>
                                        <button type='submit' className='btn-orange-small font-montserrat font-color-white'>
                                            Salvar alterações
                                        </button> 
                                    </DialogActions>

                                    {carregando && <CircularProgress />}
                                    
                                </div>
                                {erro &&
                                    <Alert severity="error" onClick={handlecloseAlert}>{erro} 
                                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                        <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Alert> 
                                } 
                            </div>
                        </form>
                </DialogContent>  
            </Dialog>
        </div>
  );
}