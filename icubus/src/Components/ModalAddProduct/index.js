import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
        Button,
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
import useStyles from './style';


export default function ModalAddProduct({open, setOpen}) {
    const { register, handleSubmit } = useForm();
    const classes = useStyles(); 
    const [ active, setActive ] = useState({
            checkedA: true,
            checkedB: true,
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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Novo Produto</DialogTitle>
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
                                            checked={active.checkedA}
                                            onChange={handleChange}
                                            name="checkedA"
                                            color="primary"
                                        />
                                        }
                                        label="Ativar produto"
                                />

                                <FormControlLabel
                                        control={
                                        <Switch
                                            checked={active.checkedB}
                                            onChange={handleChange}
                                            name="checkedB"
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
                                    <Button onClick={handleClose} color="primary" size='small' >
                                        Cancelar
                                    </Button>
                                    <Button  color="primary" type='submit' size='small' >
                                        Adicionar produto ao cardápio
                                    </Button>
                                </DialogActions>
                            </div>
                        </form>
                </DialogContent>  
            </Dialog>
        </div>
  );
}