import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import useStyles from './style';
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



export default function ModalEditProduct({ open, setOpen, id, nome, descricao, preco, ativo, permite_observacoes, img }) {
    const classes = useStyles(); 
    const history = useHistory();
    const { token } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ carregando, setCarregando ] = useState(false);
    const [ erro, setErro ] = useState('');
    const [ active, setActive ] = useState({
            ativo: ativo,
            permite_observacoes: permite_observacoes,
    });
    
    
    const product = {
            nome: nome,
            descricao: descricao,
            preco: Number(preco).toFixed(2)*100,
    };
    

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
                nome: data.name || product.nome,
                descricao: data.description || product.descricao,
                preco: precoFormatado || product.preco,
                permiteObservacoes: active.permite_observacoes
            };

            try{
                const resposta = await fetch(` https://icubus.herokuapp.com/produtos/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(produtoFormatado),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const dados = await resposta.json();

                if(resposta.status !== 200) {
                   setErro(dados.erro);
                   return;
                };
            }
            catch(error) {
                setErro(error.message);
                return;
            }
            
            if(ativo === true && active.ativo !== ativo ) {   

                try {
                    const resposta = await fetch(` https://icubus.herokuapp.com/produtos/${id}/desativar`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const dados = await resposta.json();

                    if(resposta.status !== 200) {
                        setErro(dados.erro);
                        return;
                    };

                } catch(error) {
                    setErro(error.message);
                    return;
                }
            }

            if(ativo === false && active.ativo !== ativo) {
                try {
                    const resposta = await fetch(` https://icubus.herokuapp.com/produtos/${id}/ativar`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const dados = await resposta.json();

                    if(resposta.status !== 200) {
                       setErro(dados.erro);
                       return;
                    };

                } catch(error) {
                    setErro(error.message);
                    return;
                }
            }
            setCarregando(false);
            history.push('/produtos');
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
                                    placeholder={nome}
                                    {...register('name', {maxLength: 50})} 
                                />  
                                    {errors.name?.type === 'maxLength' && <Alert severity="error">{'O nome deve ter até 50 caracteres'}</Alert>}  

                                <InputLabel htmlFor="description">Descrição</InputLabel>
                                <TextField  
                                    size='small' 
                                    variant='outlined'
                                    id='description'  
                                    placeholder={descricao}
                                    helperText="Max: 80 caracteres"
                                    {...register('description', { maxLength: 100 })} 
                                />               
                                    {errors.description?.type === 'maxLength' && <Alert severity="error">{'A descrição deve ter até 100 caracteres'}</Alert>}   

                                <InputLabel htmlFor="value">Valor</InputLabel>    
                                <TextField
                                    size='small' 
                                    variant='outlined'
                                    id='value'
                                    placeholder={preco}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    {...register('value')}
                                />

                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={ativo ? active.ativo : false}
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
                                        checked={permite_observacoes ? active.permite_observacoes : false}
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
                                    {erro && <Alert severity="error">{erro}</Alert>}
                                </div>
                            </div>
                        </form>
                </DialogContent>  
            </Dialog>
        </div>
  );
}