import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import UploadIcon from '../../Assets/upload-icon.svg';
import useStyles from './style';
import './style.css';


import Alert from '@material-ui/lab/Alert';
import ActionButtonSubmit from '../ActionButtonSubmit';
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


export default function ModalAddProduct({open, setOpen}) {
    const classes = useStyles(); 
    const history = useHistory();
    const { token } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [ active, setActive ] = useState({
            ativo: true,
            permite_observacoes: false,
    });
    
    const handleChange= (event) => {
            setActive({ ...active, [event.target.name]: event.target.checked });
    };

    const handleClose = () => {
            setOpen(false);
    };

    async function onSubmit(data) {
        setCarregando(true);
       
        const precoFormatado = Number(data.value).toFixed(2)*100;
        
        const produtoFormatado = {
            nome: data.name,
            descricao: data.description,
            preco: precoFormatado,
            ativo: active.ativo,
            permite_observacoes: active.permite_observacoes,
        };
        
        try {
            const resposta = await fetch('https://icubus.herokuapp.com/produtos', {
                method: 'POST',
                body: JSON.stringify(produtoFormatado),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const dados = await resposta.json();

            if(resposta.status === 200) {
                setOpen(false);
                //  history.push('/produtos');
            } else{
                setErro(dados.erro);
                return;
            }
        }
        catch(error) {
            setErro(error.message);
        }
        setCarregando(false);
    };

    return (
        <div className={classes.dialog}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='xl'>
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Novo Produto</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                        <form  noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            <div className={classes.formDiv}>
                                <InputLabel htmlFor="name">Nome</InputLabel>
                                <TextField 
                                    size='small' 
                                    type='text'
                                    variant='outlined'
                                    id='name' 
                                    {...register('name', { required:true, maxLength: 50 })} 
                                />    
                                    {errors.name?.type === 'required' && <Alert severity="error">{'O campo nome é obrigatório'}</Alert>}
                                    {errors.name?.type === 'maxLength' && <Alert severity="error">{'O nome deve ter até 50 caracteres'}</Alert>}

                                <InputLabel htmlFor="description">Descrição</InputLabel>
                                <TextField  
                                    size='small' 
                                    type='text'
                                    variant='outlined'
                                    id='description'  
                                    helperText="Max: 100 caracteres"
                                    {...register('description', { maxLength: 100 })} 
                                />                 
                                    {errors.description?.type === 'maxLength' && <Alert severity="error">{'A descrição deve ter até 100 caracteres'}</Alert>} 

                                <InputLabel htmlFor="value">Valor</InputLabel>    
                                <TextField
                                    size='small' 
                                    type='text'
                                    variant='outlined'
                                    id='value'
                                    placeholder='00.00'
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    {...register('value', { required: true })}
                                />
                                    {errors.value?.type === 'required' && <Alert severity="error">{'O campo preço é obrigatório'}</Alert>}

                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={active.ativo}
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
                                    <img src={UploadIcon} />
                                </div>

                                <DialogActions>
                                <button 
                                    className='transparent-btn font-montserrat font-color-orange font-bold' 
                                    onClick={handleClose} 
                                >
                                        Cancelar
                                </button>
                                    
                                <ActionButtonSubmit /> 

                                </DialogActions>

                                {carregando && <CircularProgress />}
                                {erro && <Alert severity="error">{erro}</Alert>}
                                
                            </div>
                        </form>
                </DialogContent>  
            </Dialog>
        </div>
  );
}