import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import UploadIcon from '../../Assets/upload-icon.svg';
import ActionButtonSubmit from '../ActionButtonSubmit';
import useStyles from './style';


export default function ModalAddProduct({open, setOpen}) {
    const { register, handleSubmit } = useForm();
    const classes = useStyles(); 
    const [ active, setActive ] = useState({
            ativo: true,
            permite_observacoes: true,
    });
    
    const handleChange= (event) => {
            setActive({ ...active, [event.target.name]: event.target.checked });
    };

    const handleClose = () => {
            setOpen(false);
    };

    function onSubmit(data) {
        console.log(data)
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
                                    variant='outlined'
                                    id='name' 
                                    {...register('name', {required:true, maxLength: 150})} 
                                    type='text'
                                />    

                                <InputLabel htmlFor="description">Descrição</InputLabel>
                                <TextField  
                                    size='small' 
                                    variant='outlined'
                                    id='description'  
                                    helperText="Max: 80 caracteres"
                                    {...register('description', {required:true, maxLength: 80})} 
                                />                  

                                <InputLabel htmlFor="value">Valor</InputLabel>    
                                <TextField
                                    size='small' 
                                    variant='outlined'
                                    id='value'
                                    placeholder='00.00'
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    {...register('value', {required: true})}
                                />

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
                            </div>
                        </form>
                </DialogContent>  
            </Dialog>
        </div>
  );
}