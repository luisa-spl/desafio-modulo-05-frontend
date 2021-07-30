import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthContext';
import useStyles from './style';
import { disableProduct, activateProduct, editProduct } from '../../Services/functions';
import './style.css';

import Alert from '@material-ui/lab/Alert';
import { 
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        FormControlLabel,
        InputAdornment,
        InputLabel,
        Switch,
        TextField,
        CircularProgress
    } from '@material-ui/core';



export default function ModalEditProduct({ open, setOpen, id, img }) {
    const classes = useStyles();
    const { token } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ carregando, setCarregando ] = useState(false);
    const [ erro, setErro ] = useState('');
    const [ produto, setProduto ] = useState([]);
    const [ active, setActive ] = useState({
            ativo: true,
            permite_observacoes: false,
    });
    
    useEffect(() => {
        async function listarProdutos(){
            try {
                const resposta = await fetch(`https://icubus.herokuapp.com/produtos/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    }
                });
            
                const  dados = await resposta.json();
                console.log(dados, 'singleProduct');

                if(!resposta.ok){
                    return setErro(dados)
                }
                
                setProduto(dados)
            } 
            catch(error) {
                return error.message;
            }
        }
        listarProdutos()
    }, [token, id])


    const handleChange= (event) => {
            setActive({ ...active, [event.target.name]: event.target.checked });
    };

    const handleClose = () => {
           return setOpen(false);
    };

    async function onSubmit(data) {
            setCarregando(true)

            const precoFormatado = Number(data.value).toFixed(2)*100;
            
            const produtoFormatado = {
                nome: data.name || produto.nome,
                descricao: data.description || produto.descricao,
                preco: precoFormatado || produto.preco,
                permiteObservacoes: active.permite_observacoes
            };

                const { dados, erro } = await editProduct({produtoFormatado, id, token})
                console.log(dados, 'editProduct');
                if(erro) {
                    setErro(erro);
                    setCarregando(false);
                    handleClose();
                    return 
                };
            
            if(produto.ativo === true && active.ativo !== produto.ativo ) {   
                const { dados, erro } = await disableProduct({id, token})
                console.log(dados, 'disable');
                if(erro){
                    setErro(erro);
                    setCarregando(false);
                    handleClose();
                    return 
                }
               
            }

            if(produto.ativo === false && active.ativo !== produto.ativo) {
                
                const { dados, erro } = await activateProduct({id, token})
                console.log(dados, 'activate');
                if(erro){
                    setErro(erro)
                    setCarregando(false);
                    handleClose();
                    return 
                }
            }

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
                                    placeholder={produto.nome}
                                    {...register('name', {maxLength: 50})} 
                                />  
                                    {errors.name?.type === 'maxLength' && <Alert severity="error">{'O nome deve ter até 50 caracteres'}</Alert>}  

                                <InputLabel htmlFor="description">Descrição</InputLabel>
                                <TextField  
                                    size='small' 
                                    variant='outlined'
                                    id='description'  
                                    placeholder={produto.descricao}
                                    helperText="Max: 80 caracteres"
                                    {...register('description', { maxLength: 100 })} 
                                />               
                                    {errors.description?.type === 'maxLength' && <Alert severity="error">{'A descrição deve ter até 100 caracteres'}</Alert>}   

                                <InputLabel htmlFor="value">Valor</InputLabel>    
                                <TextField
                                    size='small' 
                                    variant='outlined'
                                    id='value'
                                    placeholder={produto.preco/100}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    {...register('value')}
                                />

                                <FormControlLabel
                                    control={
                                    <Switch
                                       
                                        checked={produto.ativo ? active.ativo : false}
                                        onChange={handleChange}
                                        name="ativo"
                                        color="primary"
                                    />
                                    }
                                    label="Ativar produto"
                                />

                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={produto.permite_observacoes ? true : active.permite_observacoes}
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
                                {erro && <Alert severity="error">{erro}</Alert>}
                            </div>
                        </form>
                </DialogContent>  
            </Dialog>
        </div>
  );
}